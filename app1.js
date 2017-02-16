const https = require('https');
const username = "chalkers";
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

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
	console.log(response.statusCode);
});

