

/* Handling the surprise route of /api is done here*/

const router = require("express").Router();
const getSurprise = require("../controllers/surprise");


// Root route delegates the request to the controller and recieves payload json with type and result properties.

router.get("/", (req, res) => {
	const name = req.query.name;
	const birthYear = req.query.birth_year;

	getSurprise(name, birthYear)
		.then((payload) => {
			res.status(200).send(payload);
		})
		.catch((error) => {
			res.status(400).send(error.message);
		});
});

module.exports = router;
