const con = require("../configuration/mysqlConf");

let myreq="Select * from chambre";

function getReqChambres(){
  return con.then(function(conn){
    let chambres = conn.query(myreq);
    return chambres
  })
}

module.exports={
  getReqChambres
}