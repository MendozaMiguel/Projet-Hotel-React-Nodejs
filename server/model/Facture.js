const connSql = require('../configuration/mysqlConf');

function getAllFacture() {
    return connSql.then(function(conn){
        let resultat = conn.query("SELECT * FROM reservation INNER JOIN Facturation ON reservation.id_facturation = Facturation.id WHERE id_facturation = 2");
        return resultat
    });
}

module:exports = {
  getAllFacture:getAllFacture
}
