const axios = require("axios");

/**
 * Service resposible for retrieving data from the adviceslip API
 * 
 * @returns {Promise} returns a promise with API response
 */

module.exports = getAdvice = () => {
	return axios.get("https://api.adviceslip.com/advice").then((data) => data);
};
