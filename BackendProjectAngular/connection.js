const mongoose = require('mongoose');

// URL de connexion
const mongoURI = 'mongodb+srv://ghaith:90200747@angularproject.wzdbv.mongodb.net/?retryWrites=true&w=majority&appName=AngularProject'; // Remplace par ton URL

// Fonction pour initialiser la connexion
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à MongoDB réussie');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1); // Arrête le serveur en cas d'échec
  }
};

// Exportation de la fonction
module.exports = connectDB;
