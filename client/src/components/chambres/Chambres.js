import React, { Component } from "react";
import axios from "axios";
// import CardChambre from "./cardChambre";

export default class Chambres extends Component {
  state = {
    chambres: []
  };

  componentDidMount() {
    axios
      .get("/api/chambres")
      .then(res => {
        this.setState({ chambres: res.data.chambres });
        console.log(res.data.chambres);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.chambres.map((chambre) => {
          return(
            <div>
              <div id="titre">Chambres:</div>
              <div id="idChambre">{chambre.id}</div>
              <div id="nomChambre">{chambre.name}</div>
              <div id="descriptionChambre">{chambre.description}</div>
              <div id="prixChambre">{chambre.price}</div>
              <img src={`/upload/img_${chambre.image}`} alt={chambre.image}></img>
              <div id="categorieChambre">{chambre.category}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
