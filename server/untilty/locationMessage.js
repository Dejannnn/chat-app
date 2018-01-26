const moment= require('moment');

const generatelocationMessage = (from, lat, lag) => {

    return { from, url: `https://www.google.com/maps?q=${lag},${lat}`, createAt: moment().valueOf()};
}


module.exports= { generatelocationMessage }