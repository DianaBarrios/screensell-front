import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li>
            <Link as={Link} to={'/usuario'}>
              <div>Mi perfil</div>
            </Link>
          </li>
          <li>
            <Link as={Link} to={'/ordenes'}>
              <div>Ordenes</div>
            </Link>
          </li>
          <li>
            <Link as={Link} to={'/productos'}>
              <div>Productos</div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
