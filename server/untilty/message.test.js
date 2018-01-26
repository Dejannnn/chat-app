var expect = require('expect');
const { generateMessage } = require('./messages');
const { generatelocationMessage } = require('./locationMessage');

describe("Generate message", () => {
    it("Shoud generate correct message object",() => {

        var from="Dejan";
        var text="Gdje si";
        const message= generateMessage(from, text);
        expect(message.createAt).toBeTruthy();
        expect(message).toBeTruthy();


    })

});
describe("Generate location message", () => {
    it("Shoud generate correct location object",() => {

        var from="Dejan";
        var lat=20.5412545;
        var lag=50.5412545;
        const locationMessage= generatelocationMessage(from, lat, lag);
        expect(locationMessage.createAt).toBeTruthy();
        expect(locationMessage).toBeTruthy();


    })

}); 