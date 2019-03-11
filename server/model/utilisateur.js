//Déclaration de notre connexion SQL
const connSql = require('../configuration/mysqlConf');

function getAll() {
    return connSql.then(function(conn){
        let resultat = conn.query("SELECT * FROM utilisateurs");
        return resultat
    });
}



function postEnregistrement(prenom, hash){
  return connSql.then(function(conn){
      let resultat = conn.query("INSERT INTO utilisateurs (prenom, motdepasse) VALUES(?,?)", [prenom, hash]);
      return resultat
  });
}

function deleteUser(idUtlisateurs) {
  return connSql.then(function(conn){
    let resultat = conn.query("DELETE FROM utilisateurs WHERE id  = ? ", [idUtlisateurs]);
    return resultat
  });
}

function modifyUserGet(idUtlisateurs) {
  return connSql.then(function(conn){
    let resultat = conn.query("SELECT * FROM utilisateurs WHERE id  = ? ", [idUtlisateurs]);
    return resultat
  });
}

function modifyUserPost(req,hash) {
  var idUtlisateurs = req.params.idUtilisateurs;
  var prenomUtilisateur = req.body.prenom;
  return connSql.then(function(conn){
    let resultat = conn.query("UPDATE utilisateurs SET prenom = ? , motdepasse = ? WHERE id  = ? ", [prenomUtilisateur, hash, idUtlisateurs]);
    return resultat
  });
}



module.exports ={
  getAll:getAll,
  postEnregistrement:postEnregistrement,
  deleteUser:deleteUser,
  modifyUserGet:modifyUserGet,
  modifyUserPost:modifyUserPost
};
