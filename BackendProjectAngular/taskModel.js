const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    taskname: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
    unique: false, 
 

  },
  endDate: {
    type: Date,
    required: true,
    
  },

  status:{
    type:Number,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  
});


const taske = mongoose.model('taske', taskSchema);


module.exports = taske;
