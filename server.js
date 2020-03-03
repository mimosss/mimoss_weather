
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '279c65bd2c0bd04f3488fe12ad8c0f22';
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;

  console.log(city);

 let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+apiKey;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again or check your connection'});
   } else {
   	console.log(url);
      let weather = JSON.parse(body)
      console.log(body);
     
       // console.log(weather.main);
       // console.log(weather.weather[0]);
       // console.log(weather.weather[0].main);
       //  console.log(weather.name);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error,invalid city name'});
      } else {
      	let icon = 'http://api.openweathermap.org/img/w/'+ weather.weather[0].icon + '.png';
        let currentWeather = weather.weather[0].main;
        let weatherText = weather.main.temp + '°C';
        let cityName = "Location: " + weather.name;
        

        res.render('index', {icon:icon,currentWeather:currentWeather,weather:weatherText,cityName:cityName, error: null});
      }
    }
  });

})


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
