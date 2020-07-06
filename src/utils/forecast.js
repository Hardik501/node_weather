const request = require('request');


const forecast = (woeid, callback) => {
    const url = 'https://www.metaweather.com/api/location/' + woeid

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, res.body)
        }
    })
}

module.exports = forecast
