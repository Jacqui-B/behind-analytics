
const express = require('express');
const app = express();
const PORT = 3001
const bodyParser = require('body-parser')
const request = require('request');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('build'));


app.get('/', (req, res) => {
  res.json(res.data);
});


app.post('/main', function (req, res) {
  let url = `http://food2fork.com/api/search?key=047a0cce093c993357dd1680e1cd85e2&sort=r&q=vegetarian`
  request(url, (error, response, body) => {
    console.log(url);
    res.send(body);
  }) 

});

app.post('/', function (req, res) {
  let url = `http://food2fork.com/api/search?key=047a0cce093c993357dd1680e1cd85e2&q=vegetarian%20${req.body.searchIndex}`
  request(url, (error, response, body) => {
    // console.log(url);
    res.send(body);
  })

});
//sending search index to the server

app.post('/recipe', function (req, res) {
  console.log(req.body);
  request(` http://food2fork.com/api/get?key=047a0cce093c993357dd1680e1cd85e2&rId=${req.body.recipeDetails}`, (error, response, body) => {
    console.log(body);
    res.send(body);
  })

});
//sending receipe details to the server
//using post requests because we are sending data to the server


app.listen(PORT, () => {
  console.log('start')
});