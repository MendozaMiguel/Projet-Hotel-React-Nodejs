//Déclaration de notre connexion SQL
const connSql = require('../configuration/mysqlConf');

// Visualisation des chambres dans la page
function getAll() {
    return connSql.then(function(conn){
    let resultat = conn.query("SELECT * FROM chambre");
    return resultat
    });
}

// Ajout des chambres dans la base de données via la requete
function chambrePost(req,filename){
    let mesParametres = [req.body.fname,req.body.lname,req.body.email,filename,req.body.phone];
    return connSql.then(function(conn){
      let resultat = conn.query("INSERT INTO chambre (name,description,price,image,category) values(?,?,?,?,?)",mesParametres);
      return resultat
  });

}

// Vue modification des chambres avec les données
function modifyChambreGet(req) {
    return connSql.then(function(conn){
    let resultat = conn.query("SELECT * FROM chambre WHERE id = ?",[req.params.id]);
    return resultat
    });
}


// Requete sql pour l'insertion des modification effectuées dans le formulaire
function modifierChambrePost(req,filename){
  let reqUpdate = " UPDATE chambre SET name = ? , description = ? , price = ? , image = ? , category = ? WHERE id = ?";
    return connSql.then(function (conn) {
      let resultat = conn.query(reqUpdate, [req.body.fname, req.body.lname, req.body.email, filename, req.body.phone, req.params.id]);
      return resultat
  });
}

// Voir la chambre selectionnée dans la page admin : button voir
function voirChambre(req){
  return connSql.then(function(conn){
  let resultat = conn.query("SELECT * FROM chambre WHERE id = ?",[req.params.id]);
  return resultat
  });
}

// supprimer la chambre selectionnée dans la page admin : button effacer
function deleteChambre(req){
  return connSql.then(function(conn){
  let resultat = conn.query("DELETE FROM chambre WHERE id=?",[req.params.id]);
  return resultat
  });
}

// Exportation
module.exports ={
getAll:getAll,
modifyChambreGet:modifyChambreGet,
modifierChambrePost:modifierChambrePost,
chambrePost:chambrePost,
voirChambre:voirChambre,
deleteChambre:deleteChambre,
}
