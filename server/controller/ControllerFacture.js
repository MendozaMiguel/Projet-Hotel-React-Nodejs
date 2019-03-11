const query = require('./../model/Facture');

function AfficherFacture(req,res){
  query.getAllFacture().then(function (resultat, err) {
      res.render('recapitulatif',{resultat:resultat})
  });
}

module.exports={
  AfficherFacture:AfficherFacture
}
