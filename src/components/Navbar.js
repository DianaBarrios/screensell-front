import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {
    return (
      <div className="topnav" id="myTopnav">
        <a id="icon-nav" class="icon" onClick={this.myFunction}>
          <i className="fa fa-bars"></i>
        </a>

        <div className="nav-collapsable">
          <a id="inicio-link" href="/">
            Inicio
          </a>
          <a id="tienda" href="/tienda">
            Tienda
          </a>
          <a id="contacto" href="/contacto">
            Contacto
          </a>
        </div>

        <div className="nav-right">
          <a id="cuenta" href="/usuario">
            Cuenta
          </a>
          <a id="carrito" href="/carrito">
            <i class="fa fa-shopping-cart"></i> Carrito
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
