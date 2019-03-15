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
  }
};
