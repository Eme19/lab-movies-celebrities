const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);


const movieSchema = new Schema({
title:{
    type: String,
    required: true,
},

 genre: {
    type: String,
    required: true,  
  },
plot:{
    type: String,
    required: true,
  },

    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }]
  
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;