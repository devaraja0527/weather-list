const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const https = require('https');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.listen(3000, function(){
  console.log('Node js Express js Tutorial');
});

app.get('/', function (req, res) {
  res.render('index', {city : null, weather: null, error: null});
});

app.post('/', function (req, res) {

  let cityName = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e3d21f05d4b1170940b68d9d7b20613b`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {city: cityName, weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
	  if(weather.list == undefined){
        res.render('index', {city: cityName, weather: null, error: 'Error, please try again'});
      } else {
		  console.log(weather.list)
        let weatherText = weather.list;
        res.render('index', {city: cityName, weather: weatherText, error: null});
      }
    }
});
});