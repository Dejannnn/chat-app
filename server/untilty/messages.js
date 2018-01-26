const moment= require('moment');

const generateMessage = (from, text) => {

    return {
        from,
        text,
        createAt: moment().valueOf()
    }

};

module.exports= {
    generateMessage
}