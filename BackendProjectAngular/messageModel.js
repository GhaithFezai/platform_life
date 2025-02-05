const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true, // ID utilisateur requis
    },
    idpersonne: {
      type: String,
      required: true, // ID de la personne requis
    },
   
    text: {
      type: String,
      required: true, // Le texte du message est requis
    },
    status: {
      type: Number,
      required: true, // Le texte du message est requis
    },
  },
  {
    timestamps:true,
  });
  
  const newmessage = mongoose.model('newmessage', messageSchema);
module.exports = newmessage;
