var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/getPlayers', function(req, res) {
  url = 'http://www.howstat.com/cricket/Statistics/Players/PlayerCountryList.asp?Country=IND';

  request(url, function(error, response, html) {

    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture

      var matches, runs, battingAvg, wkts, bowlAvg;
      var testJson = {
        matches: "",
        runs: "",
        battingAvg: "",
        wkts: "",
        bowlAvg: ""
      };
      var ODIjson = {
        matches: "",
        runs: "",
        battingAvg: "",
        wkts: "",
        bowlAvg: ""
      };
      var t20Json = {
        matches: "",
        runs: "",
        battingAvg: "",
        wkts: "",
        bowlAvg: ""
      };

      var data = $(this);
      const result = $(".TableLined").map((i, element) => ({
        player: $(element).find('td:nth-of-type(1)').text().trim(),
        numberTestMatches: $(element).find('td:nth-of-type(2)').text().trim(),
        testRuns: $(element).find('td:nth-of-type(3)').text().trim()
      })).get();

      var data = [];
      // data.push(JSON.stringify(result[0].player).replace(/\\n/g, '\n'));
      // data.push(JSON.stringify(result[0].numberTestMatches).replace(/\\n/g, '\n'));

      var players = JSON.stringify(result[0].player).replace(/\\n/g, '\n');
      players = players.replace(/\s\s+/g, ' ');

      fs.writeFile('output.json', data, function(err) {

        console.log('File successfully written!');

      });
    }
  });
});

app.listen('8081', '127.0.0.1');
console.log("Listening");
exports = module.exports = app;
