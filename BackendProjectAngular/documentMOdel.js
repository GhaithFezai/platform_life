const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true, // ID utilisateur requis
    },
    idmatierre: {
        type: String,
        required: true, // ID utilisateur requis
      },
    titre: {
      type: String,
      required: true, // ID de la personne requis
    },
   
    text: {
      type: String,
      required: true, // Le texte du message est requis
    },
    
  },
  {
    timestamps:true,
  });
  
  const newdocument = mongoose.model('newdocument', documentSchema);
module.exports = newdocument;
