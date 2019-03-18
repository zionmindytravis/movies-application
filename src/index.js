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

const starGen = function (rating) {
    let starHTML = '';

    for (let i = 0; i < rating; i++) {
        starHTML += '<i class="fas fa-star"></i>'
    }

    return starHTML;
};


const getHTML = function(title, rating, id) {

    let starHTML = starGen(rating);
  let html =  `<div class="col-12 col-md-6 my-2">`;
      html += `<div class="col">`;
      html += `<h2 class="mr-2">${title}</h2><p>`;
      html += `${starHTML}</p>`;
      html += `<button id="edit${id}" class="btn btn-sm btn-outline-warning mr-4 yellowBtn" type="submit">Edit</button>
            <button id="delete${id}" class="btn btn-sm btn-outline-warning mr-4      yellowBtn" type="submit" onClick="window.location.reload()">Delete</button>`;
      html += `</div></div>`;

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
