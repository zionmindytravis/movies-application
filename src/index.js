/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// setTimeout(function () {
//   sayHello('World');
// }, 1000);


/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {

    $('#movies').append(getHTML(title, rating, id));
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

const getHTML = function(title, rating, id) {
  let html = `<div><h1>${title}</h1><p><strong>`;
      html+= `</strong>Rating:</strong> `;
      html += `${rating}</p></div>`;

    return html;
};

const addMovie = () =>
    $('#submit').on('click', function() {
      let title = $('#title').val();
      let rating = $('input[name = rating]:checked').val();
      console.log(`${title} ${rating}`);

    });
addMovie();