const axios = require("axios");

/**
 * Service resposible for retrieving data from the chuck-norris-jokes API
 * 
 * @returns {Promise} returns a promise with API response
 */

module.exports = getChuckNorris = () => {
	return axios.get("https://api.chucknorris.io/jokes/random")
				.then((response) => response);
};
