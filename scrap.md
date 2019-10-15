## 1. node install node-fetch 


### scrape4.js

    const fetch = require('node-fetch');
    const cheerio = require('cheerio');

    const url = 'https://www.imdb.com/find?q=star+wars&s=tt&ttype=ft&ref_=fn_ft';

    function searchMovies(searchTerm) {
      return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
    }


    searchMovies('star wars')
      .then(body => {
        const movies = []
        // console.log(body);
        const  $= cheerio.load(body);
        $('.findResult').each(function(i, element) {
          const $element = $(element)
          const $image = $element.find('td a img');
          const $title = $element.find('td.result_text a');
          const movie = {
            image: $image.attr('src'),
            title: $title.text()
          }
          movies.push(movie);

          // console.log($element.text());
          // console.log($image.attr('src'));
          // console.log($title.text());
        })
        console.log(movies);
      })

## 2. node install express nodemon

### scrape4.js modify

    const fetch = require('node-fetch');
    const cheerio = require('cheerio');

    const url = 'https://www.imdb.com/find?q=star+wars&s=tt&ttype=ft&ref_=fn_ft';

    function searchMovies(searchTerm) {
      return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
          const movies = []
          const  $= cheerio.load(body);
          $('.findResult').each(function(i, element) {
            const $element = $(element)
            const $image = $element.find('td a img');
            const $title = $element.find('td.result_text a');
            const movie = {
              image: $image.attr('src'),
              title: $title.text()
            }
            movies.push(movie);
          })
          return movies;
        });

    }

    module.exports = {
      searchMovies
    };
    
### app.js

    const express = require('express');
    const scraper = require('./scrape4');

    const app = express();

    app.get('/', (req, res) => {
      res.json({
        message: 'Scrap is Fun!!'
      })
    })

    // /search/star wars
    // /search/fight club
    // /search/office space
    app.get('/search/:title', (req, res) => {
      console.log('search: %s', req.params.title)
      scraper
        .searchMovies(req.params.title)
        .then(movies => {
          res.json(movies);
        });
    })

    app.get('/movie/:imdbID', (req, res) => {
      console.log('imdbID: %s', req.params.imdbID)
      scraper
        .getMovie(req.params.imdbID)
        .then(movie => {
          res.json(movie);
        });
    })

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });


### scrape4.js modify
    
    const fetch = require('node-fetch');
    const cheerio = require('cheerio');

    const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
    const movieUrl = 'https://www.imdb.com/title/';

    function searchMovies(searchTerm) {
      return fetch(`${searchUrl}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
          const movies = []
          const  $= cheerio.load(body);
          $('.findResult').each(function(i, element) {
            const $element = $(element)
            const $image = $element.find('td a img');
            const $title = $element.find('td.result_text a');

            const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
            const movie = {
              image: $image.attr('src'),
              title: $title.text(),
              imdbID: imdbID
            }
            movies.push(movie);
          })
          return movies;
        });

    }

    function getMovie(imdbID) {
      return fetch(`${movieUrl}${imdbID}`)
        .then(response => response.text())
        .then(body => {
          const $ = cheerio.load(body);
          const $title = $('.title_wrapper h1');

          const title = $title.first().contents().filter(function() {
            return this.type === 'text';
          }).text().trim();

          //<span itemprop="ratingValue">8.6</span>
          const ratingValue = $('span[itemProp="ratingValue"]').text();
          const runtime = $('.title_wrapper .subtext').find('time').text().trim();
          const geners = []
          $('.title_wrapper .subtext a').each((i, ele) => {
            // const genres = $(ele).attr('href').match(/genres/)[1];
            // console.log(typeof $(ele).attr('href').match(/genres/))
            if ($(ele).attr('href').indexOf('genres') !== -1) {
              geners.push($(ele).text().trim());
            }
          });
          const summary = $('.summary_text').text().trim();
          return {
            title: title,
            ratingValue: ratingValue,
            runtime: runtime,
            genres: geners,
            summary: summary
          };
        })
    }

    module.exports = {
      searchMovies,
      getMovie
    };
