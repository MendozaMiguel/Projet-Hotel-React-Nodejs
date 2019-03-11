const query = require('./../model/login');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function accueilGet(req, res) {
    res.send('/api/home');
}

function connexionGet(req, res) {
    res.send('/api/login');
}


function connexionPost(req, res) {

  if (req.body.prenom == null || req.body.motdepasse == null) {
      res.redirect('/api/login');
  }
  var prenomUtilisateur = req.body.prenom;
  var motDePasseUtilisateur = req.body.motdepasse;
    query.connexionPost(prenomUtilisateur).then(function (resultat, err) {
      if (err) throw err;
      if (resultat.length === 1) {
          bcrypt.compare(motDePasseUtilisateur, resultat[0].motdepasse, function(err, resCompare) {
              if (err) throw err;
             if (resCompare === true){
                 req.session.admin = true ;
                 console.log('connecte ok');
                 res.redirect('/api/utilisateurs');
             }else {
                 req.session.admin = false ;
                 console.log('connecte ko');
                 res.redirect('/api/login');
             }
          });
      }else {
          req.session.admin = false ;
          res.redirect('/api/login');
          console.log('connecte ko');
      }
  });
}


function deconnection(req,res){
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      }	else {
          res.redirect('/api/home');
      }
  })
}




module.exports = {
    accueilGet:accueilGet,
    connexionGet: connexionGet,
    connexionPost: connexionPost,
    deconnection:deconnection
};
