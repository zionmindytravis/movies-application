module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  postMovies: (newMovie) => {
    fetch('api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    }).then(function(){
      const success = 'Movie was successfully posted to the database.';
      console.log(success)
    })
  },

  editMovies: (editedMovie) => {
    fetch('api/movies/' + editedMovie.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMovie),
    }).then(function(){
      const success = 'Movie was successfully edited.';
      console.log(success);
    })
  },

  deleteMovie: (id) => {
    fetch('api/movies/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    }).then(function(){
      const success = 'Movie was successfully deleted.';
      console.log(success)
    })
  },
};

