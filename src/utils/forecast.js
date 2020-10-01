const request = require('request');


const forecast = (woeid, callback) => {
    const url = 'https://www.metaweather.com/api/location/' + woeid

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location you are searching', undefined)
        } else {
            callback(undefined, res.body)
        }
    })
}

module.exports = forecast
