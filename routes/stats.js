

/* Handling the stats route of /api is done here*/

var router = require("express").Router();
const { readStats } = require("../database/db_handler");

router.get("/", (req, res) => {
	try{
		const data = readStats();
		res.status(200).send(data);
	}catch(error){
		res.status(500).send(error);
	}
});

module.exports = router;
