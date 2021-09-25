const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mainRoutes = require("./routes");

// Handles sending static files to client 
app.use(express.static("public"));

// root route loads index.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// api routes 
app.use("/api", mainRoutes);

// undefined routes handling 
app.get("*", (req, res) => {
	res.status(404).send("404 Page not found - Unknown route reached");
});

module.exports = app.listen(port, () => {
	console.log(`server is listening on port ${port}!`);
});
