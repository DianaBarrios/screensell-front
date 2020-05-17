import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: []
    };
    }

    componentWillMount() {
        fetch("https://screensell-back.herokuapp.com/product/")
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({products: data.products}) 
        })
    }
  
    render(){
        const {products} = this.state;

        return(
            <div className="page-division">
                <Sidebar/>
                <div className="page-content">
                    <h2>PRODUCTOS</h2>
                    <div>
                        <ul>
                            {
                                products.map(product =>
                                    <li>
                                        <h3>{product.name}</h3>
                                    </li>
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default Product;