var express = require('express');
var bodyParser = require('body-parser')
var app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/ModifyValue', function (req, res) {
    console.log(req.body)
    res.send("ok");
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});        

