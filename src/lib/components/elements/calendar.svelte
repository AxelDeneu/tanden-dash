<script>
	const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
	const startingMondayDaysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	function getDaysArray(year, month) {
		const daysInWeek = 7;
		let date = new Date(year, month, 1);
		const daysArray = [];

		// Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
		let firstDayOfWeek = date.getDay();

		// Also get the last day of the week for the last day of the month
		date.setMonth(date.getMonth() + 1);
		date.setDate(date.getDate() - 1);
		let lastDayOfWeek = date.getDay();

		date = new Date(year, month, 1);

		// Prepend days from the previous month
		for (let i = firstDayOfWeek - 1; i > 0; i--) {
			const prevDate = new Date(year, month, 1 - i);
			daysArray.push({
				dayOfWeek: daysOfWeek[prevDate.getDay()],
				dayOfMonth: prevDate.getDate(),
				month: prevDate.getMonth(),
				date: prevDate
			});
		}

		// Add days of the current month
		while (date.getMonth() === month) {
			daysArray.push({
				dayOfWeek: daysOfWeek[date.getDay()],
				dayOfMonth: date.getDate(),
				month: date.getMonth(),
				date: date
			});
			date.setDate(date.getDate() + 1);
		}

		// Append days from the next month
		for (let i = lastDayOfWeek; i < daysInWeek; i++) {
			const nextDate = new Date(year, month + 1, date.getDate() + i - lastDayOfWeek);
			daysArray.push({
				dayOfWeek: daysOfWeek[nextDate.getDay()],
				dayOfMonth: nextDate.getDate(),
				month: nextDate.getMonth(),
				date: nextDate
			});
		}

		return daysArray;
	}

	// set the current date
	const currentDate = new Date();

	// Example usage:
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysArray = getDaysArray(year, month);

	// chunk the daysArray into weeks
	const weeks = [];

	while (daysArray.length) {
		weeks.push(daysArray.splice(0, 7));
	}

</script>

<div class="flex items-stretch flex-col justify-center space-y-4">
	<div class="flex items-center justify-between">
		<div></div>
		<div></div>
	</div>

	<div class="grid grid-cols-1 divide-inherit divide-solid divide-y border w-full rounded-md text-sm">
		<div class="divide-x divide-solid divide-inherit grid grid-cols-7">
			{#each startingMondayDaysOfWeek as day}
				<div class="p-4">
					<div class="text-center font-medium">{day}</div>
				</div>
			{/each}
		</div>
		{#each weeks as week}
			<div class="divide-x divide-solid divide-inherit grid grid-cols-7">
				{#each week as day}
					<div class="p-4 min-h-28">
						<div class="text-left flex flex-col items-start justify-center">
							<div
								class="w-7 h-7 flex items-center justify-center rounded-full"
								class:bg-primary={day.dayOfMonth === currentDate.getDate() && day.month === currentDate.getMonth()}
								class:text-card={day.dayOfMonth === currentDate.getDate() && day.month === currentDate.getMonth()}
								class:text-muted={day.month !== currentDate.getMonth()}
							>
								<span>{day.dayOfMonth}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>