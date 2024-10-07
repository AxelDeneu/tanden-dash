import { APPLE_ID_APP_PASSWORD, APPLE_ID_EMAIL, CALENDAR_IDS } from '$env/static/private';
import { DAVClient } from 'tsdav';
import ICAL from 'ical.js';

// split the CALENDAR_IDS string into an array by ","
const calendarIds = CALENDAR_IDS.split(',');

async function fetchCalendarData() {
	const client = new DAVClient({
		serverUrl: 'https://caldav.icloud.com',
		credentials: {
			username: APPLE_ID_EMAIL,
			password: APPLE_ID_APP_PASSWORD,
		},
		authMethod: 'Basic',
		defaultAccountType: 'caldav',
	});

	await client.login();

	const calendars = await client.fetchCalendars();
	const filteredCalendars = calendars.filter((calendar) => calendarIds.includes(calendar.ctag));
	const calendar = filteredCalendars[0];  // Choose the calendar you want to use

	return await client.fetchCalendarObjects({
		calendar,
		// Optional: filter by date range
		// startDate: new Date('2024-01-01'),
		// endDate: new Date('2024-12-31'),
	});
}

async function parseCalendarEvents() {
	const calendarObjects = await fetchCalendarData();

	const events = [];

	calendarObjects.forEach(calendarObject => {
		const icsData = calendarObject.data;
		const jcalData = ICAL.parse(icsData);
		const component = new ICAL.Component(jcalData);
		const vevents = component.getAllSubcomponents('vevent');

		vevents.forEach(event => {
			const summary = event.getFirstPropertyValue('summary');
			const startDate = event.getFirstPropertyValue('dtstart').toJSDate();
			const endDate = event.getFirstPropertyValue('dtend').toJSDate();

			// Push parsed events to the array
			events.push({
				title: summary,
				start: startDate.toISOString(),
				end: endDate.toISOString(),
			});
		});
	});

	return events;
}

export {
	parseCalendarEvents
}