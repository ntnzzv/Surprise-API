

/**
 * Reading from the database and writing into the database is handled here
 * for this API the stats.json file is our database
 */

const fs = require("fs");
const FILE_PATH = "database/stats.json";

module.exports = {
	// read json object from file
	readStats: () => {
		let result = {};
		try {
			result = JSON.parse(fs.readFileSync(FILE_PATH));
		} catch (error) {
			throw error;
		}
		return result;
	},

	// dump json object to file
	dumpStats: (stats) => {
		try {
			fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: "w+" });
		} catch (error) {
			throw error;
		}
	},
};
