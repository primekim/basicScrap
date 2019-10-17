var Horseman = require("node-horseman");
var cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('lifeplate.html');

var horseman = new Horseman();

horseman
  .open('https://www.lifeplanet.co.kr/products/pd/HPPD800S1.dev')
  // .html('#frmTopInfo')
  // .then(body => {
  //   console.log(body);
  // })
  .type('input#plnnrBrdt', '731114')
  .click('input#plnnrMale')
  .click('input#smokN')
  .click('button#fastPayCalc')
  .waitFor(function(selector){
    return $(selector).css('display') == 'block'
  }, 'div.box_product_plan', true)
  .click('input#pltcEntAmt10000000')
  .wait(500)
  .click('input#inspd0110')
  .wait(500)
  .click('input#pmtCyclCd01')
  .wait(500)
  .click('input#insuTerm0110')
  .wait(500)
  .click('input#eprtRfdrt0')
  .wait(500)
  .click('button#btnExpectInsuPay')
  .waitFor(function(selector){
    return $(selector).css('display') == 'block'
  }, 'div.box_product_plan', true)
  // .html()
  .then(body => {
    console.log(body);
  })
  .html('div.box_product_plan')
    .then(function(html){
      cancerResult(html);
  }).catch(function (err) {
      console.log(err);
  }).finally(function() {
      horseman.close();
  });


function cancerResult(html){
  console.log(html);
  writeStream.write(`${html}`);

  let $ = cheerio.load(html);
  var list = [];
  var obj = {};
  var prdName = $('p.tit_product span.txt').text();
  console.log('productName: ', prdName);
  var premium = $('#premiumLabel2').text();
  console.log('월 보험료: ', premium)

}
