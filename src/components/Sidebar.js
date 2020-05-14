import React, { Component } from "react";
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar">
            <ul>
                <li><a href="/perfil">Mi perfil</a></li>
                <li><a href="/ordenes">Ordenes</a></li>
                <li><a href="/productos">Productos</a></li>
            </ul>
        </div>
    );
  }
}
 
export default Sidebar;