//Déclaration de notre connexion SQL
const connSql = require('../configuration/mysqlConf');


// Requete sql pour envoyer les données dans la bdd via le formulaire reservation
function ReservationPost(req) {
      let mesParametres = [req.body.datechoisi,req.body.nb_nuit,req.body.nb_personnes,req.body.type,req.body.nom,req.body.prenom,req.body.tel,req.body.adresse,req.body.comp_adresse,req.body.cp,req.body.ville,req.body.pays,req.body.chambres1,req.body.chambres2,req.body.chambres3,req.body.chambres4,req.body.chambres5,req.body.petitdej,req.body.balcon,req.body.vue,req.body.climatisation,req.body.msgcomplementaire];
      // let mesParametres=[]
      return connSql.then(function(conn){
        let resultat = conn.query("INSERT INTO reservation (`datechoisi`, `nb_nuit`, `nb_personnes`, `type`, `nom`, `prenom`, `tel`, `adresse`, `comp_adresse`, `cp`, `ville`, `pays`, `single`, `twin`, `familial_triple_2_lits`, `familial_triple_3_lits`, `familial_quadruple`, `options_supplementaires`, `balcon`, `vue`, `climatisation`, `msgcomplementaire`,`id_facturation`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)",mesParametres);
        return resultat
    }); 
}


// Requete sql pour envoyer les données dans la bdd via le formulaire contact
function ContactPost(req){
    let mesParametres =[req.body.civilite,req.body.nom,req.body.prenom,req.body.email,req.body.societe,req.body.adresse,req.body.cp,req.body.ville,req.body.tel,req.body.message];
    return connSql.then(function(conn){
      let resultat = conn.query("INSERT INTO contact (civilite, nom, prenom, email, societe, adresse, cp, ville, tel, message) VALUES (?,?,?,?,?,?,?,?,?,?)",mesParametres);
      return resultat
  });
}

// Requete sql pour afficher la facture by id de la table Facturation
function getAllFacture() {
    return connSql.then(function(conn){
        let resultat = conn.query("SELECT * FROM reservation INNER JOIN Facturation ON reservation.id_facturation = Facturation.id WHERE id_facturation = 3");
        return resultat
    });
}



// Exportation
module.exports ={
  ReservationPost:ReservationPost,
  ContactPost:ContactPost,
  // getAllFacture:getAllFacture
}
