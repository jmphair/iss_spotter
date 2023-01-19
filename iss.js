/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');


const fetchMyIP = function(callback) { 
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    const ip = JSON.parse(body);
    console.log(ip.ip); //dot notation to access the string that is the ip address inside the object
  });
};

//call the function
fetchMyIP();

module.exports = { fetchMyIP };