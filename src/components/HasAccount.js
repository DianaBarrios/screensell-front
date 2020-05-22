import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import LinkButton from "./LinkButton";
import Login from "./Login";
class HasAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-division">
        <LinkButton to="/usuario/login">¡Ingresa a tu cuenta!</LinkButton>
        <LinkButton to="/usuario/nuevo">¡Registrate aquí!</LinkButton>
      </div>
    );
  }
}

export default HasAccount;
