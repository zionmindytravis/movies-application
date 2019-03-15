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
const {postMovies} = require('./api.js');


getMovies().then((movies) => {

  movies.forEach(({title, rating, id}) => {

    $('#movies').append(getHTML(title, rating, id));


    editMovie(title, rating, id);

    $(`#delete${id}`).on('click', function () {
        console.log(`You clicked delete${id}`);
    });

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

const getHTML = function(title, rating, id) {
  let html =  `<div class="col-6">`;
      html += `<div class="row">`;
      html += `<h2>${title}</h2><p>`;
      html += `<strong>Rating:</strong>`;
      html += `${rating}</p></div>`;
      html += `<button id="edit${id}" class="btn btn-warning mr-4 row" type="submit">Edit</button>
            <button id="delete${id}" class="btn btn-danger mr-4 row" type="submit">Delete</button>`;
      html += `</div>`;

    return html;
};

const addMovie = () =>
    $('#submit').on('click', function() {
        console.log(`You clicked the submit button`);
        const newMovie = {
            title: $('#title').val(),
            rating: $('input[name = rating]:checked').val(),
        };

        postMovies(newMovie);
        getMovies().then((movies) => {
            movies.forEach(({title, rating, id}) => {
                $('#movies').append(getHTML(title, rating, id));
            });
        });
    });

addMovie();

const editMovie = (title, rating, id) => {
    $(`#edit${id}`).on('click', function () {
        $('#form-heading').html('Edit Movie');
        $('#editTitle').html(`${title}`);
        $('#title').val(`${title}`);
        $("input[value='0']").attr('checked', true);
        console.log(`You clicked edit ${id} ${title}`);
    });
};

