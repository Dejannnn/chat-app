const expect = require('expect');
const { isRealString } = require('./validator');

describe("Is real function", () => {
    it("Shoud reject non-string values",() => {

         const str=" s s s";
        const res= isRealString(90);
        expect(res).toBe(false);


    });
    it("Shoud reject non-string values",() => {

        const res= isRealString(90);
        expect(res).toBe(false);


    });
    it("Shoud reject string with onalyspace values",() => {

        const res= isRealString("    ");
        expect(res).toBe(false);


    });
    it("Shoud reject allow string with non-space values",() => {

        const res= isRealString("sadasdas");
        expect(res).toBe(true);


    });
});