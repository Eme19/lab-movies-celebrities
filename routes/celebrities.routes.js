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


router.get('/celebrity-details/:id', (req, res)=> {
    Celebrity.findById(req.params.id)
    .then((specificelebrityfromDB)=>{
        res.render('celebrities/celebrity-details',{celebritydetails: specificelebrityfromDB})
    })
    .catch((err) => console.log(`Error while rendring celebrities details`));
});

router.post("/celebrities/:id/delete", (req, res) =>{
    Celebrity.findByIdAndRemove(req.params.id)
    .then(()=> res.redirect('/celebrities'))
    .catch((err) => console.log(`Error while redirecting`));
 });


 router.get('/celebrities/:id/edit', (req, res) => {
    Celebrity.findById(req.params.id)
    .then((celebritybyIdDB) => {
        res.render('celebrities/edit-celebrities', {celebrity: celebritybyIdDB})
    })
    .catch((err) => console.log(`Error while edit celebrities`));
 });


 router.post('/celebrities/:id/edit', (req, res) => {
    const {name,occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate({name, occupation, catchPhrase})
        .then(updatedcelebrity => {
            console.log( updatedcelebrity);
            res.redirect('/celebrity-details')

        })
  .catch((err) => console.log(`Error while redirecting Edit celebrities ${err}`));
});

module.exports = router;