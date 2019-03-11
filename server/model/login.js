//Déclaration de notre connexion SQL
const connSql = require('./../configuration/mysqlConf');


function connexionPost(prenomUtilisateur) {

  return connSql.then(function (conn) {
    let resultat = conn.query("SELECT * FROM utilisateurs WHERE prenom = ?", [prenomUtilisateur]);
    return resultat
  });
}

module.exports = {

  connexionPost: connexionPost,

};
