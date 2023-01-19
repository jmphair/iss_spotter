/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');


const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    //if invalid domain or user is offline, etc...
    if (error) {
      return callback(error, null);
    }
    //if non-200 status, assume there's a server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    // if we get here then it's the HAPPY PATH to the data we want!
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

module.exports = { fetchMyIP };