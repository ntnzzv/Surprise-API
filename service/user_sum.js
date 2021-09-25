
 /**
* This service recieves the name query parameter and returns the sum of its characters
* @param    {String} name    name query
* @return   {Number}         sum of characters
*/

module.exports = getUserSum = (name) => {
	let sum = 0;

	name = name.toUpperCase().replace(/\s/g, ""); // take out the spaces in the name

	for (let letter of name) {
		sum += letter.charCodeAt(0) - 64; // 64 is the base value to subtract from each character's ASCII (A=65...Z=90)
	}

	return sum;
};
