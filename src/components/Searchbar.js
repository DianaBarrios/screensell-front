import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
    render(){
        return(
            <div className="bar">
                <input type="search" className="searchbar" placeholder="Buscar..." />
            </div>
        )
    }
}

export default Searchbar;
