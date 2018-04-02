const moment = require('moment');
const generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: moment().valueOf()
    };
};

const generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        createAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};