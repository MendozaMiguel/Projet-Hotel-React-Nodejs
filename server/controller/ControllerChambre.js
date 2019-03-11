const query = require('../model/listechambre');

function getChambre(req, res){
  query.getReqChambres().then((chambres, err)=>{
    if(err) throw err;
    res.send({chambres:chambres})
  })
}

module.exports={
  getChambre
}