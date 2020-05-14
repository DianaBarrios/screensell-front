import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Product extends Component {
    render(){
        return(
            <div className="page-division">
                <Sidebar/>
                <div className="page-content">
                    <h2>PRODUCTOS</h2>
                </div>
            </div>
        )
        
    }
}

export default Product;