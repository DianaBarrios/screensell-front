import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render(){
        return(
        <div className="footer-content">
            <p>Copyright 2020</p>
            <p>Hecho con <span role="img" aria-label="love">❤️</span> por Alis&Dianix</p>
        </div>
        )
        
    }
}

export default Footer;