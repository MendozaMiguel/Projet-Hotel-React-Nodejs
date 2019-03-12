import React, { Component } from "react";
import axios from "axios";

export default class Accueil extends Component {
  
  state = {};

  componentDidMount(){
    axios.get("/api/home")
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    return <div>Hello</div>;
  }
}

// export default componentName
