const router = require("express").Router();

// all your routes here
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");




router.get("/movies/create", (req, res) => {
   Celebrity.find()
   .then((celebrityDB) => {
    res.render("movies/new-movie",{celebrityDB})})
});




router.post("/movies/create", (req, res)=> {
    const { title, genre, plot, cast} = req.body;
    console.log(req.body)

       Movie.create({title, genre, plot, cast})
        .then(()=> res.redirect('/movies'))
.catch((err)=> console.log(`Error wile creating a new user: ${err}`))
});

router.get("/movies", (req, res)=> {
   Movie.find()
     .then((moviesFromDB) => {
      console.log(moviesFromDB)
      res.render("movies/movies", {movies: moviesFromDB})})
     .catch((err) => console.log(`Error while getting list of celebrities from the DB: ${err}`));
 });


   router.get('/movie-details/:movieid', (req, res, next)=> {
      const {movieid} = req.params;
     Movie.findById(movieid)
       .populate('cast')
       .then(foundMovieDB => {
      console.log('movies details', foundMovieDB)
      res.render('movies/movie-details', {movie: foundMovieDB})
   })
   .catch(err => {
      console.log(`err while getting single movies from the DB: ${err}`);
      next(err);
   })
});

router.post("/movies/:id/delete", (req, res) =>{
   Movie.findByIdAndRemove(req.params.id)
   .then(()=> res.redirect('/movies'))
   .catch((err) => console.log(`Error while redirecting`));
});



router.get('/movies/:id/edit', (req, res, next)=>{

   let celebrityList
   Celebrity.find()
   .then((listDB)=> {
   celebrityList = listDB
   })
   Movie.findById(req.params.id)
   .populate('cast')
   .then((currentmovieDB)=>{
      res.render('movies/edit-movie', {Items: currentmovieDB, listDB: celebrityList})
   })
});


router.post("/movies/:id/edit", (req, res) => {
  const {id} = req.params;
 const { title, genre, plot, cast} = req.body;
 Movie.findByIdAndUpdate(id, { title, genre, plot, cast})
  .then(()=> {
   res.redirect('/movies')
  })
  .catch((err) => console.log(`Error while redirecting ${err}`));
});

module.exports = router;