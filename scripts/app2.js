'use strict';
const apiKey = config.api;
const currentCity = document.querySelector('.city');
const currentTemp = document.querySelector('.temp');
const weatherText = document.querySelector('.weather-text');
const weatherIcon = document.querySelector('.weather-icon');
const feelsLike = document.querySelector('.feels-like');
const hi = document.querySelector('.hi');
const low = document.querySelector('.low');
const sunrise = document.querySelector('.sunrise-time');
const sunset = document.querySelector('.sunset-time');
const wind = document.querySelector('.wind-speed');
const rainChance = document.querySelector('.rain-chance');
const uv = document.querySelector('.uv');
const humidity = document.querySelector('.humidity');

const todaysDateDisplay = document.querySelector('.today-date-info');

// Hourly Forecast
// const hourlyCurrentTemp = document.querySelector('.current-temp');
// const currentWeatherIcon = document.querySelector('.current-weather-icon');
// const currentTime = document.querySelector('.current-time');

const hourOneTemp = document.querySelector('.hour_one-temp');
const hourOneIcon = document.querySelector('.hour_one-icon');
const hourOneTime = document.querySelector('.hour_one-time');

const hourTwoTemp = document.querySelector('.hour_two-temp');
const hourTwoIcon = document.querySelector('.hour_two-icon');
const hourTwoTime = document.querySelector('.hour_two-time');

const hourThreeTemp = document.querySelector('.hour_three-temp');
const hourThreeIcon = document.querySelector('.hour_three-icon');
const hourThreeTime = document.querySelector('.hour_three-time');

const hourFourTemp = document.querySelector('.hour_four-temp');
const hourFourIcon = document.querySelector('.hour_four-icon');
const hourFourTime = document.querySelector('.hour_four-time');

const hourFiveTemp = document.querySelector('.hour_five-temp');
const hourFiveIcon = document.querySelector('.hour_five-icon');
const hourFiveTime = document.querySelector('.hour_five-time');

// search
const searchText = document.querySelector('.search-text');
const searchBox = document.querySelector('input');

// Today's date
const today = new Date();
const day = today.getDay();
const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
const month = today.getMonth();
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
const date = today.getDate();

//Current Weather

let weatherToday = {
	// api: '',

	getCity: function (city) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
		)
			.then((response) => response.json())
			.then((data) => this.getWeatherInfo(data));
	},
	getWeatherInfo: function (data) {
		const lon = data.coord.lon;
		const lat = data.coord.lat;
		currentCity.innerText = data.name;

		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		// convert epoch to readable time
		const readableSunrise = new Date(
			data.current.sunrise * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		const readableSunset = new Date(
			data.current.sunset * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});

		currentTemp.innerText = Math.round(data.current.temp) + '°';
		weatherText.innerText = data.current.weather[0].main;
		hi.innerText = Math.round(data.daily[0].temp.max) + '°';
		low.innerText = Math.round(data.daily[0].temp.min) + '°';
		weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
		feelsLike.innerText = Math.round(data.current.feels_like) + '°';
		sunrise.innerHTML = readableSunrise;
		sunset.innerHTML = readableSunset;

		wind.innerText = data.current.wind_speed + ' mi/h';

		uv.innerText = data.current.uvi;
		humidity.innerText = data.current.humidity + '%';
		todaysDateDisplay.innerText = today.toLocaleDateString('en-US', {
			timeZone: `${data.timezone}`,
			weekday: 'long',
			month: 'short',
			day: 'numeric',
		});

		// Hourly Forecast
		// hourlyCurrentTemp.innerText = Math.round(data.current.temp) + '°';
		// currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;

		hourOneTemp.innerText = Math.round(data.hourly[3].temp) + '°';
		hourOneIcon.src = `https://openweathermap.org/img/wn/${data.hourly[3].weather[0].icon}.png`;
		hourOneTime.innerText = new Date(
			data.hourly[3].dt * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			hour12: true,
		});

		hourTwoTemp.innerText = Math.round(data.hourly[6].temp) + '°';
		hourTwoIcon.src = `https://openweathermap.org/img/wn/${data.hourly[6].weather[0].icon}.png`;
		hourTwoTime.innerText = new Date(
			data.hourly[6].dt * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			hour12: true,
		});

		hourThreeTemp.innerText = Math.round(data.hourly[9].temp) + '°';
		hourThreeIcon.src = `https://openweathermap.org/img/wn/${data.hourly[9].weather[0].icon}.png`;
		hourThreeTime.innerText = new Date(
			data.hourly[9].dt * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			hour12: true,
		});

		hourFourTemp.innerText = Math.round(data.hourly[12].temp) + '°';
		hourFourIcon.src = `https://openweathermap.org/img/wn/${data.hourly[12].weather[0].icon}.png`;
		hourFourTime.innerText = new Date(
			data.hourly[12].dt * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			hour12: true,
		});

		hourFiveTemp.innerText = Math.round(data.hourly[15].temp) + '°';
		hourFiveIcon.src = `https://openweathermap.org/img/wn/${data.hourly[15].weather[0].icon}.png`;
		hourFiveTime.innerText = new Date(
			data.hourly[15].dt * 1000,
		).toLocaleTimeString('en-US', {
			timeZone: `${data.timezone}`,
			hour: 'numeric',
			hour12: true,
		});
	},

	search: function () {
		// this.getCity(searchText.value);
		this.getCity(searchText.value + ', us');
	},
};

searchText.addEventListener('keyup', (e) => {
	e.preventDefault();
	if (e.key === 'Enter') {
		weatherToday.search();
		searchText.value = '';
	}
});

searchBox.addEventListener('click', () => {
	searchBox.setAttribute(
		'placeholder',
		'City Name, 2-letter Country-Code (if outside US)',
	);
});

weatherToday.getCity('chicago');
