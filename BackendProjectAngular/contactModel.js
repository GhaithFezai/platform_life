const { text } = require('body-parser');
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  contactcode: {
    type: String,
 
  },
  name: {
    type: String,
 
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
});


const contact = mongoose.model('contact', contactSchema);


module.exports = contact;
