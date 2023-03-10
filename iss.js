
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


const fetchISSFlyOverTimes = function (coords, callback) {
  const urlFly = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(urlFly, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };