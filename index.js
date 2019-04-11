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
      })).get()
      console.log("-------------", JSON.stringify(result[0].player));

      // We will repeat the same process as above.  This time we notice that the release is located within the last element.
      // Writing this code will move us to the exact location of the release year.

      // release = data.children().last().children().text();

      // json.title = title;

      // Once again, once we have the data extract it we'll save it to our json object

      // json.release = release;
    }
  });
});

app.listen('8081', '127.0.0.1');
console.log("Listening");
exports = module.exports = app;
