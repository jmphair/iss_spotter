
const request = require('request');


const fetchMyIP = (callback) => {
  const urlAPI = 'https://api.ipify.org?format=json';
  request(urlAPI, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};



const fetchCoordsByIP = (ip, callback) => {
  const urlWhoIs = `http://ipwho.is/${ip}`;
  request(urlWhoIs, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };