const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");





router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));


router.post("/celebrities/create", (req, res)=> {
    const { name, occupation, catchPhrase} = req.body;
    console.log(req.body)

        Celebrity.create({name, occupation, catchPhrase})
        .then(()=> res.redirect('/celebrities'))
.catch((err)=> console.log(`Error wile creating a new user: ${err}`))
});

router.get("/celebrities", (req, res)=> {
  Celebrity.find()
    .then((celeFromDB) => res.render("celebrities/celebrities", {celebrities: celeFromDB}))
    .catch((err) => console.log(`Error while getting list of celebrities from the DB: ${err}`));
});
module.exports = router;