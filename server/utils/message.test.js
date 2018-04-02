const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({ from, text });
        // store res in variable
        // assert from match
        // assert text match
        // assert createAt is number
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object',() => {
        const user = {
            from : 'Jen',
            latitude: 15,
            longitude: 19,
            url: 'https://www.google.com/maps?q=15,19'
        };
        const message = generateLocationMessage(user.from, user.latitude, user.longitude);
        expect(message.createAt).toBeA('number');
        expect(message).toInclude({ from: user.from, url: user.url});
    });
});