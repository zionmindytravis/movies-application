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
const {editMovies} = require('./api.js');
const {deleteMovie} = require('./api.js');


const movieGet = () => getMovies().then((movies) => {

  movies.forEach(({title, rating, id}) => {
    $('#movies').append(getHTML(title, rating, id));
    editMovie(title, rating, id);
    deleteMovies(id);
  });

  $('#movie-form').removeClass('hide');
  $('#ajaxLoader').addClass('hide');

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

movieGet();

const getHTML = function(title, rating, id) {
  let html =  `<div class="col-6">`;
      html += `<div class="row">`;
      html += `<h2>${title}</h2><p>`;
      html += `<strong>Rating:</strong>`;
      html += `${rating}</p></div>`;
      html += `<button id="edit${id}" class="btn btn-warning mr-4 row" type="submit">Edit</button>
            <button id="delete${id}" class="btn btn-danger mr-4 row" type="submit" onClick="window.location.reload()">Delete</button>`;
      html += `</div>`;

    return html;
};

const addMovie = () =>
    $('#submit').on('click', function() {
        console.log(`You clicked the submit button`);
        if ($('#title').val === '' || !$('input[name = rating]:checked')) {
            console.log(`Form not filled out`);
        } else {
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
        }
    });

addMovie();

const editMovie = (title, rating, id) => {
    $(`#edit${id}`).on('click', function () {

        $('#submit').toggleClass('hide');
        $('#editSubmit').toggleClass('hide');
        $('#cancelEdit').toggleClass('hide');

        $('#form-heading').html('Edit Movie');
        $('#editTitle').html(`${title}`);
        $('#editRating').html(`Rating: ${rating}`);
        $('#title').val(`${title}`);
        document.getElementById(`${rating}`).checked = true;

        let editedMovie;

        $('#editSubmit').on('click', function() {
            editedMovie = {
                title: $('#title').val(),
                rating: $('input[name = rating]:checked').val(),
                id: id
            };
            editMovies(editedMovie);
        })
    });
};

const deleteMovies = (id) => {
    $(`#delete${id}`).on('click', function () {
        console.log(`You clicked delete ${id}`);
        deleteMovie(id);
    });
};
