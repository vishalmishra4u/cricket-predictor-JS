var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/getPlayers', function(req, res){
    url = 'http://www.howstat.com/cricket/Statistics/Players/PlayerCountryList.asp?Country=IND';

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var ODIjson = { matches : "", runs : "", battingAvg : "", wkts : "", bowlAvg : ""};
            var testJson = { matches : "", runs : "", battingAvg : "", wkts : "", bowlAvg : ""};
            var t20Json = { matches : "", runs : "", battingAvg : "", wkts : "", bowlAvg : ""};
        }
    });
});

app.listen('8081')
exports = module.exports = app;
