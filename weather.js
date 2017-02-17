// http://api.wunderground.com/api/d3358f0b76b5f93f/conditions/q/CA/San_Francisco.json
// `http://api.wunderground.com/api/d3358f0b76b5f93f/conditions/q/${state}/${city}.json`
const https = require('https');
const api = require('./api.json')
const http = require('http');

function printMessage(weather, query) {
	const message = `${location} is ${weather} today`
	console.log(message)
}

function getWeather(query) {
	const request = https.get(`http://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`, response => {
		let body = " ";
		response.on('data', chunk => {
			body += chunk;
		});

		response.on('end', () => {
			console.log(body);
		});
	});
}

module.exports.getWeather = get;