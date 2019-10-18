const request = require('request')
const cheerio = require('cheerio')
const charset = require('charset')
const Iconv  = require('iconv').Iconv
const fs = require('fs')
const writeStream = fs.createWriteStream('headline.txt')

const iconv = new Iconv('euc-kr', 'utf-8')


// request('http://www.naver.com', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     // console.log(html)

//     let $ = cheerio.load(html)

//     // html에서 search dom를 검색
//     const search = $('.search')

//     // search 의 html 출력
//     console.log(search.text())
//   }
// })
let url = "http://news.naver.com";
// encoding -> 해당 값을 null로 해주어야 제대로 iconv가 제대로 decode 해준다.
request({url, encoding: null}, (error, response, html) => {
  if (!error && response.statusCode === 200) {

    let enc = charset(response.headers, html)
    console.log(enc)
    let contents = iconv.convert(html).toString();
    let $ = cheerio.load(contents)
    let news = $('div.hdline_news')
    // console.log(newsList.text())
    let list = []
    $('.hdline_article_list li a').each((index, item) => {
      let headLine = {
        title: $(item).text().trim(),
        href: $(item).attr('href').trim()
      }
      if (headLine.title.indexOf('관련기사') === -1) {
        list.push(headLine)
        writeStream.write(`${index} ${headLine.title} ${headLine.href} \n`)
      }
    })
    console.log(JSON.stringify(list))
  }
})
