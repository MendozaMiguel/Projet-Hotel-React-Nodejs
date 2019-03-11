const query = require('./../model/utilisateur');
//chiffrement du mot de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;

function utilisateurGet (req, res) {
  if (!req.session.admin === true) {
      res.send('ERROR404')
  }
  query.getAll().then(function(resultat, err){
      if (err) throw err;
      res.send({resultat: resultat});
  })
}

function getEnregistrement(req, res){
  if (!req.session.admin === true){
      res.send('ERROR404');
  }
    res.render('pageFormulaire');
}

function postEnregistrement(req, res){
  if (prenom === null || motdepasse === null) {
      res.render('pageFormulaire');
  } else {
      // let prenom = req.body.prenom;
      // let motdepasse = req.body.motDePass;
      let hash = bcrypt.hashSync(motdepasse, saltRounds);
      //On prepare l'insertion avec les '?,?' que l'on remplace juste après avec [prenom,motdepasse]
      query.postEnregistrement(prenom, hash).then(function (resultat, err) {
          if (err) throw err;
          res.redirect('/utilisateurs');
      });
  }
}

function deleteUser(req, res){
  var idUtlisateurs = req.params.idUtilisateurs;
  query.deleteUser(idUtlisateurs).then(function (resultat, err) {
      if (err) throw err;
      res.redirect('/utilisateurs');
  });
}


function modifyUserGet(req, res){
  var idUtlisateurs = req.params.idUtilisateurs;
  query.modifyUserGet(idUtlisateurs).then(function (resultat, err) {
      if (err) throw err;
      res.render('pageModifier', {resultat: resultat});
  });
}

function modifyUserPost(req, res){
  var motDeDasseUtilisateur = req.body.motDePass;
  let hash = bcrypt.hashSync(motDeDasseUtilisateur, saltRounds);
  query.modifyUserPost(req,hash).then(function (resultat,err,meta) {
      if (err) throw err;
      res.redirect('/utilisateurs');
  });
}


module.exports = {
    utilisateurGet:utilisateurGet,
    getEnregistrement:getEnregistrement,
    postEnregistrement:postEnregistrement,
    deleteUser:deleteUser,
    modifyUserGet:modifyUserGet,
    modifyUserPost:modifyUserPost,
};
