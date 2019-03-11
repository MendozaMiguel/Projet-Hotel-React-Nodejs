//Déclaration d'Express :
const express = require('express');
const app = express();

//Déclaration file-upload pour les images
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Pour recuperer les donnée des formulaire usage de body parser
const bodyParser = require('body-parser');

//Overide pour utiliser DELETE
const methodOverride = require('method-override');

//On previent express qu'il faut l'utiliser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Overide pour utiliser DELETE et PUT depuis formulaire (_methode)
app.use(methodOverride('_method'));

//session express
const session = require('express-session');

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

//express session
app.use(session({
    secret: 'kfgudrydrh',
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}));

/*
 Tout ce qui est dans le dossier fichiersStatiques sera accecible sur notre site depuis /puclic
 pour utiliser un fichier style.css dans le dossier css sur notre site il faudra dans notre template EJS
 <style href="/public/css/style.css" ...
 */
// app.use("/public", express.static(process.cwd() + "/fichiersStatiques"));

// DECLARATION de l'utilisation de EJS
// app.set("view engine", "ejs");

// middlewares pour admin
const regleUtilisateurs =require('./middlewares/regleUtilisateurs');
app.use(function (req, res, next) {
regleUtilisateurs.ifLogin(req,res,next);
});

//##########################################
//### PARTIE CONTROLEURS
//##########################################

const ControllerChambres = require("./controller/controllerChambre");
const ControllerLogin = require('./controller/loginController');
const utilisateurs = require('./controller/utilisateurController');
const crud = require('./controller/crudController');
const client = require('./controller/ControllerClient');
// const facture = require('./controller/ControllerFacture');
//##########################################
//### FIN PARTIE CONTROLEURS
//##########################################

app.use(function(req,res,next){
    console.log(req.originalUrl)
    // console.log(req.body)
    next()
  })

// Page accueil description de l'hotel
app.get('/api/home',ControllerLogin.accueilGet);

// Page Chambres disponibles
app.get('/api/chambres', ControllerChambres.getChambre);

// Vue connection
app.get('/api/login',ControllerLogin.connexionGet);

// Envoi des données a partir de la vue connection
app.post('/api/login',ControllerLogin.connexionPost);

// Route Formulaire enregistrement
app.get('/api/enregistrement', utilisateurs.getEnregistrement);

//GROUPE ROUTE UTILISATEUR
app.get('/api/utilisateurs',utilisateurs.utilisateurGet);

//Route Formulaire enregistrement
app.post('/api/utilisateurs',utilisateurs.postEnregistrement);

//Route Formulaire deleteUser
app.delete('/api/utilisateurs/:idUtilisateurs', utilisateurs.deleteUser);

//Route Formulaire ModifieUser
app.get('/api/utilisateurs/:idUtilisateurs', utilisateurs.modifyUserGet);

//Route Formulaire ModifieUser Données envoyées
app.put('/api/utilisateurs/:idUtilisateurs', utilisateurs.modifyUserPost);

//Route deconnection revervenir à l'accueil du site
app.get('/api/deconnexion', ControllerLogin.deconnection);

// Route partie ADMIN : liste des chambres
app.get('/api/admin', crud.ChambresGet);

//Route Formulaire Ajouter chambre
app.get('/api/admin/ajouter',crud.AjouterChambreGet);

// Route Vue formulaire modifier chambre
app.get('/api/admin/:id',crud.modifyChambreGet);

// Route insertion de données dans la table chambre
app.post('/api/admin',crud.ChambresPost);

// button suppression de chambres
app.delete('/api/admin/:id',crud.deleteChambre);

// insertion modification des données dans la bdd via le formulaire modif
app.put('/api/admin/:id', crud.modifierChambrePost);

// Vue Chambre : Button voir partie Admin
app.get('/api/admin/voir/:id',crud.voirChambre);

// Vue pour le formulaire reservation
app.get('/api/reservation', client.ReservationGet);

// Envoi des données de la page reservation
app.post('/api/reservation', client.ReservationPost);

// Vue de la page tarif
app.get('/api/tarif', client.TarifGet);

// Vue  de la page contact
app.get('/api/contact', client.ContactGet);

// Envoi de données de la page contact
app.post('/api/contact',client.ContactPost);

// Vue de la page google map
app.get('/api/noustrouver', client.NousTrougerGet);

// Vue recapitulatif de la reservation infos saisis par le client
// app.get('/recapitulatif',client.AfficherFacture);


app.use(express.static('dist'))  


app.get("/", (req, res, next) => {  
  res.sendFile("index.html", { root: publicRoot })
})

// on lance l'application sur le port 5000
const port=process.env.PORT || 5000
app.listen(port,() => {
    console.log(`Server running at port `+port);
    });