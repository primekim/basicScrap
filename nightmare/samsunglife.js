var Nightmare = require('nightmare');
var cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('samsunglife_nightmare.html');

const nightmare = Nightmare({ show: true }); //electron으로 화면을 띄운다

nightmare
    .viewport(1000, 1000)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto('https://direct.samsunglife.com/index.eds')
    .wait(500)
    .click('input#mainProductChk1')
    .wait(500)
    .type('input#mainBirth', '19731114')
    .click('input#calcMainGender1')
    .wait(500)
    .click('button#mainCheckPremium')
    .screenshot('samsunglife.png')
    .wait('div#container')
    .wait(5000)
    // .evaluate(function () {
    //   return {
    //     name: $('#productTitle').text(),
    //     premium: $('#monthPremium1').text()
    //   };
    // },function (value) {
    //     console.log('productName: ', value.name);
    //     console.log('월 보험료: ', value.premium);
    //   }
    // );
    // .run(function (err, nightmare) {
    //   if (err) return console.log(err);
    //   console.log('Done!');
    // });
    .evaluate(() => {
        // return document.querySelector('#container').innerHTML; //첫번째 검색 결과의 제목을 가져온다
      return {
        name: $('#productTitle').text(),
        premium: $('#monthPremium1').text()
      };
    })
    .end()
    .then(result => {
      cancerResult(result)
    })
    .catch(function (err) {
        console.log(err);
    })

function cancerResult(result){

  console.log('productName: ', result.name);
  console.log('월 보험료: ', result.premium);

}
