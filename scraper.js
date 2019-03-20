const opn = require("opn");
const rp = require("request-promise");
const cheerio = require("cheerio");
const uri = "https://www.akelius.de/en/search/apartments/osten/berlin/list";
const BASE = "https://akelius.de";
const ROOMS = "3 Rooms";
const options = {
  uri,
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then($ => {
    $("body")
      .find(".rooms")
      .filter(function() {
        return $(this).text() === ROOMS;
      })
      .closest("a")
      .each(function() {
        opn(`${BASE}${$(this).attr("href")}`);
      });
  })
  .catch(err => {
    console.log(err);
  });
