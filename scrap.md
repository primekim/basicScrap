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
