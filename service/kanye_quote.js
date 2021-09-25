const axios = require("axios");

/**
 * Service resposible for retrieving data from the kanye-quote API
 * 
 * @returns {Promise} returns a promise with API response
 */

module.exports = getKanyeQuote = () => {
	return axios.get("https://api.kanye.rest").then((response) => response);
};
