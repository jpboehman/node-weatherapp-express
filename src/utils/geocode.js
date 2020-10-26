const request = require("postman-request");

const geocode = (address, callback) => {
  //callback -> function we'll call once we have the latitude and longitude
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoianBib2VobWFuIiwiYSI6ImNrZmZoZmNmbzBlcW8ycmxucWMwczdtOXgifQ.xQhUmvSwsKbmXIa1mbZ84A&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, please try again.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;