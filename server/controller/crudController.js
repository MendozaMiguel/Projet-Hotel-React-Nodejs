const query = require('./../model/crud');

// Affichage des toutes les chambres dans la page web
function ChambresGet (req, res) {
  // Verification si la connection est bien effectué pour l'administrateur en rentrant son id et mdp
  if (!req.session.admin === true){
      res.send('/api/home')
  }
  query.getAll().then(function(resultat, err){
      if (err) throw err;
      res.render('chambres', {resultat: resultat});
  })
}

// Vue de la page ajouter si la connection a été bien effectuée
function AjouterChambreGet(req,res){
  if (!req.session.admin === true){
      res.send('/api/home')
  }
  res.render('ajouterChambre');
}

// Envoie les données entrées dans la page ajouter à la bdd
function ChambresPost(req,res){
  if (req.files) {
    let monFichier = req.files.fichier;
    let filename = monFichier.name;
      // mv pour placer quelque part le fichier upload dans un fichier local
      monFichier.mv("./fichiersStatiques/images/upload/img_" + filename, function (err) {
          if (err) {
              return res.status(500).send(err);
          }
          query.chambrePost(req,filename).then(function(resultat, err){
              if (err) throw err;
          });
          res.redirect('/admin');
      })
  } else {
      res.send('Aucun fichier soumis');
  }
}

// Vue de la page modifier de chambre
function modifyChambreGet(req,res){
  query.modifyChambreGet(req).then(function (resultat, err) {
      res.render('modifierChambre',{resultat: resultat})
  });
}

// Envoie les données modifiées dans la page Modifer chambre à la bdd
function modifierChambrePost(req,res){
      if (req.files) {
        let monFichier = req.files.fichier;
        let filename = monFichier.name;
          monFichier.mv("./fichiersStatiques/images/upload/img_" + filename, function (err) {
              if (err) {
                  return res.status(500).send(err);
              }
              query.modifierChambrePost(req, filename).then(function (resultat, err) {
                  if (err) throw err;
                  res.redirect('/admin')
              })
          });
      }
}

// On afficher une chambre avec ses caracteristiques : button voir admin
function voirChambre(req,res){
  query.voirChambre(req).then(function (result, err) {
      res.render('voirChambres',{result:result})
  });
}

// suppression d'une chambre via le button affacer
function deleteChambre(req,res){
  query.deleteChambre(req).then(function(resultat, err){
      if(err) throw err;
      res.redirect('/admin');
  });
}




// Exportation des objets d'une function
module.exports ={
  ChambresGet:ChambresGet,
  AjouterChambreGet:AjouterChambreGet,
  ChambresPost:ChambresPost,
  modifyChambreGet:modifyChambreGet,
  modifierChambrePost:modifierChambrePost,
  voirChambre:voirChambre,
  deleteChambre:deleteChambre,
}
