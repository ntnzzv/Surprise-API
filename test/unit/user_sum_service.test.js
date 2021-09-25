const chai = require("chai");
const userSumService = require("../../service/user_sum");


describe("testing user-sum service", () => {

    let nameInput = "Sun Tzu"
    describe("get user sum for input Sun Tzu", () => {
        it("should return 121 for Sun Tzu", (done) => {

            chai.expect(userSumService(nameInput)).to.equal(121);
            done();

        })
    })
})