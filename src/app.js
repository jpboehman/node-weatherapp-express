/* eslint-disable no-debugger */
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')
const { debug } = require('console')

const app = express()
const port = process.env.PORT ||  3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath)) // -> Use the contents of this file and serve them up as static assets on our server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jackson Boehman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jackson Boehman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Contact our service team if you are experiencing issues',
        title: 'Help section',
        name: 'Jackson Boehman',
        age: 23
    })
})

//this can be referred to as the weather endpoint
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address.',
            message: 'Please check your address and send the request again'
        })
    }

    //Wire-up
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
            error: error
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
              error: error
          });
        }
         res.send({
           forecast: forecastData,
           location: location,
           address: address,
         });
      });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jackson Boehman',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jackson Boehman',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
}) //Starts up the server and has it listen on a specific port.