import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './Store.css';
import axios from 'axios';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      products: [],
      isLoading: false,
      error: null,
    };

    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        'https://screensell-back.herokuapp.com/product/'
      );
      this.setState({
        products: result.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  handleClickOnProduct(id) {
    let newPath = `/ver/${id}`;
    window.location.href = newPath;
  }

  render() {
    const { products, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3">
          <h2 className="page-title">Tienda</h2>

          <div className="container mt-3">
            <div className="row">
              {products.map((product) => (
                <div className="card">
                  <img src={product.img} alt={product.name}></img>
                  <h1>{product.name}</h1>
                  <p className="price">${product.price}</p>
                  <p>
                    <button
                      onClick={() => this.handleClickOnProduct(product.id)}
                    >
                      Ver más
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
