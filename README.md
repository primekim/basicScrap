Web Scraping Sample
================

This is an H2
-------------

# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6

## Node 프로젝트 설치

##### 1. mkdir webscraping

##### 2. cd webscraping

##### 3. npm init -y
       - package.json 파일이 생성됨.
##### 4. cheerio, request 설치
       - npm i cheerio request
       - package.json 파일의 dependencies 에
          "cheerio": "^1.0.0-rc.3",
          "request": "^2.88.0" 
          추가 됨.

##### 5. scrape.js 생성
       const request = require('request');
       const cheerio = require('cheerio');

       request('http://www.naver.com', (error, response, html) => {
         if(!error && response.statusCode == 200) {
           console.log(html);
         }
       });
##### 6. 터미널에서 실행 후 html 결과를 확인
       node scrape.js


----------------------------

##### 7. scrape.js 수정
       const request = require('request');
       const cheerio = require('cheerio');

       request('http://www.naver.com', (error, response, html) => {
         if(!error && response.statusCode == 200) {
           const $ = cheerio.load(html);

           // html중에서 class 가 'search' 인 dom를 검색
           const search = $('.search'); 
           
           // 'search' dom에 대한 html / text 만 출력
           console.log(search.html()); 
           console.log(search.text());
         }
       });
