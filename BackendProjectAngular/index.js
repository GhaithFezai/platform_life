const expresse=require("express")
const mongoose=require("mongoose")
const bodyparser=require('body-parser')
const user=require('./userModel')
const connectDB =require('./connection')
const app=expresse()
const cors=require('cors')
const taske=require('./taskModel')
const Contact=require('./contactModel')
const material=require('./materialModel')
const newmessage=require('./messageModel')
const newdocument=require('./documentMOdel')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
// connextion de la base de donnée
connectDB()
////////////////////////////////////////////////////add contact
app.post("/addcontact", (req, res, next) => {
  const { contactcode ,name,id} = req.body;
  if (!contactcode || !name) {
    return res.status(400).json({ error: "Contact code or name is required" });
  }
  const newContact = new Contact({
    contactcode: contactcode,
    name:name,
    userId:id,
  });
  newContact.save()
    .then(() => {
      res.status(200).json({ success: "Contact ajouté avec succès" });
    })
    .catch((error) => {
      console.error("Error adding contact:", error); // Affiche l'erreur dans la console
      res.status(500).json({ error: error.message || "Failed to add contact" });
    });
});
////////////////////////////////////////////////////register
app.post('/register',(req,res,next)=>{
     const name=req.body.name
     const email=req.body.email
     const password=req.body.password
     const newuser = new user({
        Name:name,
        email:email,
        password:password
     })
     newuser.save()
     res.status(200).json({succes : "ok"})
})
//////////////////////////////////////////////////////getuser
app.get("/getuser", (req, res, next) => {
  const id = req.query.id
  user.find({_id : id})
    .then((user) => {
      res.status(200).json(user); 
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    });
});
////////////////////////////////////////////////////updateuser
app.put("/updateuser/:id", (req, res) => {
  const { Name, email, password } = req.body; // Données envoyées dans le corps de la requête
  const id = req.params.id; // Récupérer l'ID depuis l'URL
  console.log("ID de l'utilisateur :", id);

  if ( !Name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis." });
  }
  // Mise à jour de l'utilisateur
  user.updateOne({ _id: id }, { Name, email, password })
    .then((result) => {
      // Vérifier si la mise à jour a affecté un document
      if (result.nModified === 0) {
        return res.status(404).json({ message: "Aucune modification n'a été apportée à l'utilisateur." });
      }

      res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    })
    .catch((err) => {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
      res.status(500).json({ message: "Impossible de mettre à jour l'utilisateur." });
    });
});
////////////////////////////////////////////////////login
app.post('/login', async (req, res) => {
   try {
     const { email, password } = req.body;
     const existingUser = await user.findOne({ email: email });
     if (!existingUser) {
       return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
     }
     const isPasswordValid = password==existingUser.password;
     if (!isPasswordValid) {
       return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
     }
     res.status(200).json({ success: true, message: 'Connexion réussie', userId: existingUser._id });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Erreur interne du serveur.' });
   }
 });
////////////////////////////////////////////////////add taske
app.post("/addtaske",(req,res,next)=>{
  const Taskname=req.body.taskName;
  const StartDate=req.body.startDate;
  const EndDate=req.body.endDate;
  const UserId=req.body.userId;
  const Status=1;
  const newtaske=new taske({
    taskname:Taskname,
    startDate:StartDate,
    endDate:EndDate,
    status:Status,
    userId:UserId,
  })
  newtaske.save()
  res.status(200).json({succes : "taske ajouter"})
})
////////////////////////////////////////////////////get taske
app.get("/gettasks", (req, res, next) => {
  const id = req.query.id
  console.log("ggggggggggggggggg",id)
  taske.find({userId : id})
    .then((tasks) => {
      res.status(200).json(tasks); 
      console.log("ggggggggggggggggg",tasks)
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    });
});
////////////////////////////////////////////////////update taske 
app.post("/updatetaske", (req, res) => {
  const { taskId, status } = req.body;
  if (!taskId || status === undefined) {
    return res.status(400).json({ error: "taskId or status is missing" });
  }
  taske.findByIdAndUpdate(
    taskId, 
    { status: status }, 
    { new: true } 
  )
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json({ success: true, updatedTask });
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
////////////////////////////////////////////////////getcontact
app.get("/getcontact", (req, res, next) => {
  const id = req.query.id
  Contact.find({userId : id})
    .then((contacts) => {
      res.status(200).json(contacts); 

    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    });
});
//////////////////////////////////////////////////deletecontact
app.delete('/deletecontact/:contactCode', (req, res) => {
  const contactCode = req.params.contactCode; 
  Contact.findOneAndDelete({ contactcode: contactCode })
    .then((deletedContact) => {
      if (!deletedContact) {
        return res.status(404).send({ message: 'Contact not found' });
      }
      res.status(200).send({ message: 'Contact deleted successfully', deletedContact });
      
    })
    .catch((error) => {
      console.error("Error deleting contact:", error);
      res.status(500).send({ message: 'Failed to delete contact' });
    });
});
//////////////////////////////////////////////////////////////////add material
app.post("/addmaterial", (req, res) => {
  const { materialName , userId} = req.body;
  if (!materialName) {
    return res.status(400).json({ error: "Le nom du matériau est requis" });
  }
  const newMaterial = new material({ material: materialName , userId : userId});
  newMaterial.save()
    .then((savedMaterial) => {
      res.status(200).json({
        success: "Matériau ajouté avec succès",
        material: savedMaterial ,
        _id:savedMaterial._id,
        
      });
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du matériau:", error);
      res.status(500).json({ error: "Échec de l'ajout du matériau" });
    });
});
/////////////////////////////////////////////////////getmaterial
app.get("/getmaterial", (req, res, next) => {
  const id = req.query.id
  material.find({userId : id})
    .then((materials) => {
      if (!materials) {
        return res.status(404).json({ error: "Aucun matériau trouvé" });
      }
      res.status(200).json(materials);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des matériaux:", error);
      res.status(500).json({ error: "Échec de la récupération des matériaux" });
    });
});
///////////////////////////////////////////////////updatematerial
app.put("/updatematerial/:id", (req, res) => {
  const materialId = req.params.id;
  const { materialName } = req.body;
  if (!materialId || !materialName) {
    return res.status(400).json({ error: "Material ID and name are required" });
  }
  material.findByIdAndUpdate(materialId, { material: materialName }, { new: true })
    .then((updatedMaterial) => {
      if (!updatedMaterial) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.status(200).json({ success: true, updatedMaterial });
    })
    .catch((error) => {
      console.error("Error updating material:", error);
      res.status(500).json({ error: "Failed to update material" });
    });
});
/////////////////////////////////////////////////////delete matiere 
app.delete('/deletematerial/:materialId', (req, res) => {
  const materialId = new mongoose.Types.ObjectId(req.params.materialId);
  console.log("Deleting material with ID:", materialId);
  material.findOneAndDelete({ _id: materialId })
    .then((deletedMaterial) => {
      if (!deletedMaterial) {
        return res.status(404).send({ message: 'Material not found' });
      }
      res.status(200).send({ message: 'Material deleted successfully', deletedMaterial });
      newdocument.findOneAndDelete({ idmatierre: materialId }).then((resp)=>{
        console.log("delete fait avec succer et matierrre supprumer ")
      })
    })
    .catch((error) => {
      console.error("Error deleting material:", error);
      res.status(500).send({ message: 'Failed to delete material' });
    });
});
/////////////////////////////////////////////////////send message 
app.post("/sendMessage", (req, res) => {
  const { id,message,idpersonne} = req.body;
  console.log(message)
  if (!id || !message || !idpersonne) {
    return res.status(400).json({ error: "information est requis" });
  }
  const Nmessage=new newmessage({
    id:id,
    idpersonne:idpersonne,
    text:message,
    status:0 
  })
  Nmessage.save()
    .then((savedMaterial) => {
      res.status(200).json({
        success: "Matériau ajouté avec succès",
        material: savedMaterial 
      });
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du matériau:", error);
      res.status(500).json({ error: "Échec de l'ajout du matériau" });
    });
});


////////////////////////////////////////////////::get messages 
app.get('/getmessages', async (req, res) => {
  const { id ,userid } = req.query;
  try {
    const messages = await newmessage.find({
      $or: [
        { id: id, idpersonne: userid },  
        { id: userid, idpersonne: id }  
      ]
    });
    if (messages.length > 0) {
      console.log(messages)
      return res.json(messages);
    } else {
      return res.status(404).json({ message: 'No messages found for this ID' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

///////////////////////////////////////////////////savedocument 
app.post("/savedocument", (req, res)=>{
  const { titre , contenu ,id ,idmatierre} = req.body;
  console.log(contenu)
  if (!id || ! titre || !contenu || !idmatierre) {
    return res.status(400).json({ error: "erreur" });
  }
  newdocument.findOne({idmatierre : idmatierre}).then(res1=>{
    if(res1){
      newdocument.updateOne({idmatierre},{ id: id , titre : titre , text : contenu , idmatierre:idmatierre})
      .then(data=>{
        console.log(data)
      })
      res.status(200).json({
        success: "Matériau ajouté avec succès",
        document: res1 
      });
    }
    else{
      const document  = new newdocument({ id: id , titre : titre , text : contenu , idmatierre:idmatierre});
      document.save()
        .then((saveddocument) => {
          res.status(200).json({
            success: "Matériau ajouté avec succès",
            document: saveddocument 
          });
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du document:", error);
          res.status(500).json({ error: "Échec de l'ajout du document" });
        });
    }
  })
});
/////////////////////////////////////////////////////getdocument 

app.get("/getdocument", (req, res, next) => {
  const id = req.query.id
  newdocument.findOne ({idmatierre : id})
    .then((document) => {
      /* problemme d'affcihage 
      if (!document) {
        return res.status(404).json({ error: "Aucun document trouvé" });
      }*/
      res.status(200).json(document);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des document:", error);
      res.status(500).json({ error: "Échec de la récupération des document" });
    });
});
/////////////////////////////////////////////////////clear document 
app.get("/cleardocument", (req, res, next) => {
  const id = req.query.id
      newdocument.updateOne({idmatierre : id},{  titre : '' , text : '' })
      .then(document=>{
        res.status(200).json(document);
      })
      .catch((error) => {
      console.error("Erreur lors de la récupération des document:", error);
      res.status(500).json({ error: "Échec de la récupération des document" });
    });
});
////////////////////////////////////////////////////demarage de serveur 
 app.listen(5000, () => {
   console.log('Serveur démarré sur http://localhost:5000');
 });