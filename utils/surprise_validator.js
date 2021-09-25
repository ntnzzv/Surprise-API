
 /**
* Validator is responsible to validate parameters served to /api/surprise route.
* @param    {String} name    		   name query
* @param    {String} birthYear         birth year query
*/

module.exports = validateParams = (name, birthYear) => {
	if (!name || !birthYear) {
		throw new Error("Bad Request (400): name/birth year missing!");
	}
};