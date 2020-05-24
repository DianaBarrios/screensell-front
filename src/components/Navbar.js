import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  render() {
    return (
      <div className="topnav" id="myTopnav">
        <a id="icon-nav" class="icon" onClick={this.myFunction}>
          <i className="fa fa-bars"></i>
        </a>

        <div className="nav-collapsable">
          <Link key={1} className={'navbar-btn'} as={Link} to={'/'}>
            <div className="navbar-btn-legend">Inicio</div>
          </Link>
          <Link key={2} className={'navbar-btn'} as={Link} to={'/tienda'}>
            <div className="navbar-btn-legend">Tienda</div>
          </Link>
          <Link key={1} className={'navbar-btn'} as={Link} to={'/contacto'}>
            <div className="navbar-btn-legend">contacto</div>
          </Link>
        </div>

        <div className="nav-right">
          <Link key={1} className={'navbar-btn'} as={Link} to={'/usuario'}>
            Cuenta
          </Link>
          <Link key={1} className={'navbar-btn'} as={Link} to={'/carrito'}>
            <i class="fa fa-shopping-cart"></i> Carrito
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
