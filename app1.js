 https = require('https');
 http  = require('http');

 function printError(error) {
 	console.error(error.message);
 }
// Problem: need simple way to find badges and JS points for users
// Soluton: Use Node.js to connect to TH API

// Connect to API url(https://teamtreehouse.com/username.json)
// Read data
// Parse the data
// Print the data

function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
	console.log(message)
}

function getProfile(username) {
	try {
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200) {
				let body = "";
				response.on('data', data => {
					body += data.toString();
				});

				response.on('end', () => {
					try {
						const profile = JSON.parse(body);
						printMessage(username, profile.badges.length, profile.points.JavaScript);
					} catch(error) {
						printError(error);
					}
				});
			} else {
				const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});
		request.on('error', printError)
	} catch (error) {
		printError(error);
	}
}

const users = process.argv.slice(2);

users.forEach(getProfile);