

/**  All routes of the /api directory are handled here.
*    Adding new routes: create a route.js file and link it to the router.
*/

const express = require("express");

const apiRouter = express();
const surpriseRoute = require("./surprise");
const statsRoute = require("./stats");

apiRouter.use("/surprise", surpriseRoute);
apiRouter.use("/stats", statsRoute);

module.exports = apiRouter;
