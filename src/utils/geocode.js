const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://www.metaweather.com/api/location/search/?query='+encodeURIComponent(address)

    request({ url, json: true }, (error, res) => {
        if (error || res ===undefined) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, res.body[0].woeid)
        }
    })
}

module.exports = geocode
