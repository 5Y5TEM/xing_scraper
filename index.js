//###### SCRAPING PROFILE PICTURES FROM XING #####//
//author: Meltem Subasioglu
//03.06.2018
//written in .atom using node.js
//Prerequisites: npm install request cheerio fs

//Initialize request, cheerio and fs
const cheerio = require('cheerio'),
      fs = require('fs');
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var request = request.defaults({
//   jar : jar,
//   followAllRedirects: true
// });
var request = request.defaults({jar: true});

var jar = request.jar();

var opn = require('opn');
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'};


//Initialize variables
var images = [];  //we'll save the image sources in this array
var profession = "Krankenschwester";
var location = "Hessen";
var pages = 2;  //enter number of pages that should be searched
var i, j, x = 0;
// opn('https://www.xing.com');

var loginUrl = "https://login.xing.com//login";
var url = 'https://www.xing.com/search/members?_=1535121078113&advanced_form=true&keywords='+profession+
'&page='+j+'&province='+location+'&section=members';

// var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = loginUrl;
//
// xhr.open(method, url, true);
// xhr.onreadystatechange = function (err,res,body) {
//   if(xhr.readyState === 4 && xhr.status === 200) {
//     console.log(xhr.responseText);
//   }
// };
// xhr.send();


request({url: loginUrl, jar: jar, headers: headers}, function (err,res,body) {
  // var cookie_string = jar.getCookieString(url); // "key1=value1; key2=value2; ..."
  var setcookie = res.headers["set-cookie"];
  // var response = res;
  // console.log(cookie_string);
  // console.log(res.headers);
  console.log(setcookie[1]);
});

//
// request.post({url : loginUrl, method : 'post',
//   body: '#login_form_username=meltem@subasioglu.de&#login_form_password=Aa-11208884089&_charset_=UTF-8&submitbutton=Einloggen'}, function(err,res,body){
//
//     if(err){
//       return console.error(err);
//   };
//
//   for(var j = 1; j <= pages; j++){
//       request(url, function(err, res, html){
//         // if no error and status code OK
//         if(!err && res.statusCode == 200){
//             var $ = cheerio.load(html);
//             $('img.user-photo').each(function(i, element){
//               var source = $(this).attr('src');
//               var result = source.replace('96x96.jpg','1024x1024.jpg');
//
//               images.push(result);
//               console.log(result);
//             });
//
//             $('div.SearchResults-occupation').each(function(i, element){
//               var text = $(this).html();
//
//               x = x + 1;
//               fs.writeFile('occupation/'+profession+x+'.txt', text, (err) => {
//                 if (err) throw err;
//                 console.log('The file has been saved!');
//               });
//             });
//
//             // saving the images from source URL as .jpg files
//             for(i; i < images.length; i++){
//               request(images[i]).pipe(fs.createWriteStream('images/'+profession+(i+1)+'.jpg', (err) => {
//                 if (err) throw err;
//               request.end();
//               }));
//             }
//
//         }
//       });
//     }
// });
