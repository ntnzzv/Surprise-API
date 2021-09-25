const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.should(); 
chai.use(chaiHttp);


describe("testing server api/stats path", () => {

	// testing GET request for stats retrieval
	const statsEndpoint = "/api/stats"
	describe(`GET ${statsEndpoint}`, () => {
		it("test should GET status:200 surprise me api stats json response", (done) => {
			chai
				.request(server)
				.get(statsEndpoint)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.have.property("requests");
					response.body.should.have.property("distribution");
					done();
				});
		});
	});
});
