import React, { Component } from "react";

import axios from "axios";

export default class reservation extends Component {
  constructor() {
    super();
    this.state = {
      date: "2017-06-15 04:00:40",
      nuits: "",
      nb_personne: "",
      type_herbe: "",
      nom: "",
      prenom: "",
      tel: "",
      email: "",
      adresse: "",
      comp_adresse: "",
      cp: "",
      ville: "",
      pays: "",
      chambre1: "",
      chambre2: "",
      chambre3: "",
      chambre4: "",
      chambre5: "",
      supp: "",
      balcon: "",
      vue_ext: "",
      climatisation: "",
      msg: ""
    };
  }

  handleChange = event => {
    // this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      datechoisi: this.state.date,
      nb_nuit: "1",
      nb_personnes: "1",
      type: "1",
      nom: "ee",
      prenom: "eee",
      tel: "0636043604",
      // email: "MendozaMiguel@outlook.Fr",
      adresse: "16 test MyTest",
      comp_adresse: "sss",
      cp: "90000",
      ville: "Paris",
      pays: "France",
      chambres1: "1",
      chambres2: "1",
      chambres3: "1",
      chambres4: "1",
      chambres5: "1",
      petitdej: "1",
      balcon: "oui",
      vue: "oui",
      climatisation: "oui",
      msgcomplementaire: "LOL"
    };

    axios
      .post("/api/reservation", { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Selectionner une date:
          <input type="text" name="datechoisi" onChange={this.handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
