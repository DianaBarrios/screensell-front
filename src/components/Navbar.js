import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/tienda">Tienda</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                    <li><a href="/perfil">Perfil</a></li>
                    <li><a href="/carrito">Carrito</a></li>
                    <li><a href="/usuario">Cuenta</a></li>
                </ul>
            </div>
        )

    }
}

export default Navbar;
