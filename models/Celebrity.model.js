//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
const celebritySchema = new Schema({
  name:{
    type: String,
  },

 occupation: {
    type: String,
  
  },
catchPhrase:{
    type: String,
  }

});

const Celebrity = mongoose.model('Celebrities', celebritySchema);

module.exports = Celebrity;