const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const endpointTypes = require("../../controllers/surprise_endpoints");

chai.should(); 
chai.use(chaiHttp);


describe("testing server api/surprise path", () => {

	// testing GET request to an unsupported route
	const unsupportedRoute = "/api/unsuportedroute";
	describe(`GET ${unsupportedRoute}`, () => {
		it("test should GET 404 route not found", (done) => {
			chai
				.request(server)
				.get(`/api/${unsupportedRoute}`)
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});
	});

	// testing GET request with empty name and birth year
	const badRequestEndpoint = "/api/surprise?name=&birth_year=";
	describe(`GET ${badRequestEndpoint}`, () => {
		it("test should GET status:400 bad request response", (done) => {
			chai
				.request(server)
				.get(badRequestEndpoint)
				.end((err, response) => {
					response.should.have.status(400);
					done();
				});
		});
	});

	// testing GET request that satisfies the condition for chuck norris joke endpoint ( birthyhear <= 2000)
	const chuckEndpoint = "/api/surprise?name=Quintin+Johnsons&birth_year=2000";
	describe(`GET ${chuckEndpoint}`, () => {
		it("test should GET status:200 'chuck-norris-joke' json response", (done) => {
			chai
				.request(server)
				.get(chuckEndpoint)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.have.property("type", endpointTypes.CHUCK_NORRIS_API);
					done();
				});
		});
	});

	// testing GET request that satisfies the condition for kanye-quote endpoint ( birthyhear > 2000 &&  name doesn't start with "A" || "Z" )
	const kanyeEndpoint = "/api/surprise?name=Quintin+Johnsons&birth_year=2001";
	describe(`GET ${kanyeEndpoint}`, () => {
		it("test should GET status:200 'kanye-quote' json response", (done) => {
			chai
				.request(server)
				.get(kanyeEndpoint)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.have.property("type", endpointTypes.KANYE_API);
					done();
				});
		});
	});

	// testing GET request that satisfies the condition for name-sum endpoint( birthyhear > 2000 &&  name starts with "A" || "Z" )
	const nameSumEndpoint = "/api/surprise?name=Alfred+Richards&birth_year=2005";
	const expectedNameSum = 126;
	describe(`GET ${nameSumEndpoint}`, () => {
		it("test should GET status:200 'name-sum' json response", (done) => {
			chai
				.request(server)
				.get(nameSumEndpoint)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.have.property("type",endpointTypes.NAME_SUM_API);
					response.body.should.have.property("result",expectedNameSum);
					done();
				});
		});
	});

	// testing GET request that satisfies the condition for an advice ( name contains the word "wisdom" )
	const adviceEndpoint = "/api/surprise?name=Wisdom+Prophet&birth_year=1903";
	describe(`GET ${adviceEndpoint}`, () => {
		it("test should GET status:200 'advice' json response", (done) => {
			chai
				.request(server)
				.get(adviceEndpoint)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.have.property("type",endpointTypes.ADVICE_API);
					done();
				});
		});
	});

		// testing GET request that satisfies the condition for chuck norris joke and name-sum endpoints
		const chuckNameSumEndpoint = "/api/surprise?name=Alfred+Johnsons&birth_year=2000";
		describe(`GET ${chuckNameSumEndpoint}`, () => {
			it("test should GET status:200 'chuck-norris-joke' or 'name-sum' json response", (done) => {
				chai
					.request(server)
					.get(chuckNameSumEndpoint)
					.end((err, response) => {
						response.should.have.status(200);
						response.body.should.have.property("type")
							.to.be.oneOf([endpointTypes.CHUCK_NORRIS_API,endpointTypes.NAME_SUM_API]);
						done();
					});
			});
		});

		// testing GET request that satisfies the condition for kanye-quote and name-sum endpoints
		const kanyeNameSumEndpoint = "/api/surprise?name=Jhon+Smith&birth_year=2010";
		describe(`GET ${kanyeNameSumEndpoint}`, () => {
			it("test should GET status:200 'kanye-quote' or 'name-sum' json response", (done) => {
				chai
					.request(server)
					.get(kanyeNameSumEndpoint)
					.end((err, response) => {
						response.should.have.status(200);
						response.body.should.have.property("type")
							.to.be.oneOf([endpointTypes.KANYE_API,endpointTypes.NAME_SUM_API]);
						done();
					});
			});
		});
});
