// use the open-meteo API to get the weather data
// https://open-meteo.com/

import axios from 'axios';

const codes = {
	0: 'sun',
	1: 'cloud-sun',
	2: 'cloud-sun',
	3: 'sun',
	4: 'cloudy',
	40: 'cloud-drizzle',
	45: 'cloud-lightning',
	49: 'cloud-drizzle',
	50: 'cloud-rain',
	51: 'cloud-rain-wind',
	53: 'cloud-snow',
	60: 'snowflake',
	61: 'snowflake',
	63: 'snowflake',
	80: 'cloud-snow',
	95: 'cloud-lightning',
};

class Weather {
	constructor() {
		this.api = axios.create({
			baseURL: 'https://api.open-meteo.com/v1/forecast',
		});
	}

	async getWeather(lat, lon) {
		try {
			const response = await this.api.get(`?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,rain,weather_code&forecast_days=1&models=meteofrance_seamless`);
			return response.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default Weather;