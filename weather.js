const https = require('https');
const api = require('./api.json')
const http = require('http');

function printError(error) {
	console.error(error.message);
}

function printWeather(weather) {
	const message = `Current temperature in ${weather.current_observation.display_location.city} today is ${weather.current_observation.temp_f}F`;
	console.log(message)
}

function getWeather(query) {
	try {
		const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`, response => {
			if (response.statusCode === 200) {
				let body = "";
				response.on('data', chunk => {
					body += chunk;
				});

				response.on('end', () => {
					try {
					const weather = JSON.parse(body);
					printWeather(weather);
					} catch(error) {
						printError(error);
					}
				});
			} else {
				const message = `There was an error getting weather for ${query} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});
		request.on('error', printError)
	} catch (error) {
		printError(error);
	}
}

module.exports.get = getWeather;