
const { readStats, dumpStats } = require("../database/db_handler");
const getChuckNorris = require("../service/chuck_norris");
const getKanyeQuote = require("../service/kanye_quote");
const getUserSum = require("../service/user_sum");
const getAdvice = require("../service/advice");
const validateParams = require("../utils/surprise_validator");

const endpointTypes = require("./surprise_endpoints");

/**
 * This controller handles the response that should be returned based of currently available API's
 * and the provided parameters.
 * @param {String} name 
 * @param {String} birthYear 
 * @returns {Promise} with appropriate payload with type and result
 */

 module.exports = getSurprise = async (name, birthYear) => {


	validateParams(name, birthYear);
	
	const validEndpoints = getValidEndpoints(name, birthYear);

	// If we have multiple endpoints that can be called, we randomly pick one. Else we take the only endpoint
	const chosenEndpoint = validEndpoints.length > 1 ? 
			validEndpoints[Math.floor(Math.random() * validEndpoints.length)]
			: validEndpoints.pop();
	
	updateStats(chosenEndpoint);
	

	switch (chosenEndpoint) {
		case endpointTypes.CHUCK_NORRIS_API:
			return getChuckNorris().then((response) => {
				return {
					type: endpointTypes.CHUCK_NORRIS_API,
					result: response.data.value,
				};
			});

		case endpointTypes.KANYE_API:
			return getKanyeQuote().then((response) => {
				return {
					type: endpointTypes.KANYE_API,
					result: response.data.quote,
				};
			});

		case endpointTypes.NAME_SUM_API:
			return {
				type: endpointTypes.NAME_SUM_API,
				result: getUserSum(name),
			};

		case endpointTypes.ADVICE_API:
			return getAdvice().then((response) => {
				return {
					type: endpointTypes.ADVICE_API,
					result: response.data.slip.advice,
				};
			});

		default:
			throw new Error("No matching API found");
	}
};

/**
 * Updates the database statistics for the relevant endpoint 
 * @param {String} endpointType 
 */

const updateStats = (endpointType) => {
	const currentStats = readStats();

	currentStats["requests"] += 1;
	if (currentStats["distribution"].some((endpoint) => endpoint.type === endpointType)) { // Check if endpoint already exists in database

		currentStats["distribution"].forEach((endpoint) => {

			if (endpoint.type === endpointType) endpoint.count += 1; // Find endpoint property and update it
			
		});
	} else currentStats["distribution"].push({ type: endpointType, count: 1 }); // If database doesn't have the endpoint, add it

	dumpStats(currentStats);
};

/**
 * Multiple endpoints can be valid for provided parameters, here we create an array the add every valid endpoint that can be called
 * @param {String} name 
 * @param {String} birthYear 
 * @returns {Array} Array of valid endpoints
 */

const getValidEndpoints = (name, birthYear) => {
	const nameFirstChar = name.toUpperCase().charAt(0);
	let endpoints = [];
	
	if (birthYear <= 2000) endpoints.push(endpointTypes.CHUCK_NORRIS_API);
	else if (nameFirstChar !== "A" && nameFirstChar !== "Z")
		endpoints.push(endpointTypes.KANYE_API);

	if (nameFirstChar !== "Q") endpoints.push(endpointTypes.NAME_SUM_API);
	if (name.toUpperCase().includes("WISDOM")) {
		endpoints = [];
		endpoints.push(endpointTypes.ADVICE_API); // advice endpoint must be called if name contains "wisdom" all other endpoints are disregarded 
	}
	return endpoints;
};

