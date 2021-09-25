const chai = require("chai");
const validateParams  = require("../../utils/surprise_validator");

describe("testing validator for surprise query params", () => {

    describe("surprise_validator with valid inputs", () => {
        it("valid name should not throw error", (done) => {

            chai.expect(() => validateParams("Moshe Cohen","1990")).to.not.throw();
            done();
            
        });
    });

    describe("surprise_validator with missing input: fullname", () => {
        it("should throw error message", (done) => {

            chai.expect(() => validateParams("","2005")).to.throw(Error);
            done();

        });
    });

    describe("surprise_validator with missing input: birth year", () => {
        it("should throw error message", (done) => {

            chai.expect(() => validateParams("Dima Nihum","")).to.throw(Error);
            done();

        });
    });

    describe("surprise_validator with missing inputs: birth year and full name", () => {
        it("should throw error message", (done) => {

            chai.expect(() => validateParams("","")).to.throw(Error);
            done();

        });
    });
})