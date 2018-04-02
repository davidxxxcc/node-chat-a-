const generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date().getTime()
    };
};

const generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        createAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};