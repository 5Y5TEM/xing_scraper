var cheerio = require('cheerio');
const fs = require('fs');
var request = require('request');

var Browser = require("zombie");
var browser = new Browser({debug: true, maxWait: 10000, waitFor: 10000, silent : true});

var images = [];
// Search Parameters:
var profession = "Krankenschwester";
var location = "Hessen";
var pages = 1;  //enter number of pages that should be searched
var i, x = 0;
var loginUrl = "https://login.xing.com/";


var login = 'USERNAME';
var password = 'PASSWORD';


  browser.visit(loginUrl, function() {

    browser.fill('#login_form_username', login);
    browser.fill('#login_form_password', password);
    browser.pressButton('button', function() {

                browser.visit('https://www.xing.com/search/members?_=1535121078113&advanced_form=true&keywords='+profession+
                '&page='+pages+'&province='+location+'&section=members' , function(err,res,body) {

                      console.log(browser.html());
                      // let data = JSON.stringify(browser.html());
                      var data = browser.html();

                      fs.writeFileSync('images/'+profession+'_Seite'+pages+'.json', data, finished);
                      function finished(err){
                    console.log('success');
                  }


                    });


            });
});
