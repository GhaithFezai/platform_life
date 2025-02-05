const { text } = require('body-parser');
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    material: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  
  
  
});
const material = mongoose.model('material', materialSchema);
module.exports = material;
