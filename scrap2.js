const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchUrl = 'https://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=';
const movieUrl = 'https://www.imdb.com/title/';

function searchMovies(searchTerm) {
  return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      // console.log(body)
      const movies = []
      const $ = cheerio.load(body)
      $('.findResult').each(function(i, element) {
        const $element = $(element)
        const $image = $element.find('td a img')
        const $title = $element.find('td.result_text a')

        const imdbID = $title.attr('href').match(/title\/(.*)\//)
        if (imdbID !== null ) {
          console.log(imdbID[1])
          const movie = {
            title: $title.text(),
            imag: $image.attr('src'),
            imdbID: imdbID[1]
          }
          movies.push(movie)
        }

        // console.log('result : %s %s %s', $image, $title, imdbID)
      })

      console.log(movies)
    })
}
// searchMovies('star wars')

function getMovie (imdbID) {
  return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .ten(body => {
      const $ = cheerio.load(body)
      
    })
}
