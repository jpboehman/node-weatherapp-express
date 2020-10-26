const request = require('postman-request');

//Abstracting this implementation from our main app.js, which is where this function is called
const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=be0d6b790cf126329b25c1c1e174f70f&query=${longitude},${latitude}&units=f`; //passing in these params introduces reusability

    request({ url, json: true }, (error, { body }) => { //{ body } is shorthand property syntax. Was previously, (error, response) -> but this new syntax extracts the body property off response object
      if (error) {
        callback('Unable to connect to weather service!');
      } else if (body.error) {
        callback('Unable to find location, please try again.');
      } else {
        console.log('')
        callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);}
    });
}

module.exports = forecast;
