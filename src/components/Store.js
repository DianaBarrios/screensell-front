import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      products: [],
      isLoading: false,
      error: null
    };
    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        "https://screensell-back.herokuapp.com/product/"
      );
      this.setState({
        products: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  handleClickOnProduct(id) {
    let newPath = `/ver/${id}`;
    this.props.history.push(newPath);
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
          <div className="container">
            <div class="card-deck">
              {products.map(product => (
                <div className="col-lg-4 col-md-6">
                  <div key={product.id} id={product.id} class="card mt-4" onClick={() => this.handleClickOnProduct(product.id)}>
                    <div class="card-header"> <i className="fa fa-shopping-cart"></i> </div>
                    <img
                      src={product.img}
                      alt={product.name}
                      class="card-img-top"
                    />
                    <div class="card-body">
                      <h4 class="card-title">{product.name}</h4>
                      <h3>${product.price}</h3>
                      <p class="card-text">
                        <small class="text-muted">{product.description}</small>
                      </p>
                      <p>
                      <Link
                      key={product.id}
                      className={'navbar-btn'}
                      as={Link}
                      to={'/ver/' + product.id}
                    >
                      <button className="btn btn-outline-primary">Ver más</button>
                    </Link>
                      </p>
                    </div>
                  </div>
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

/*In container mt-3
<div className="row">
              {products.map((product) => (
                <div className="card">
                  <img src={product.img} alt={product.name}></img>
                  <h1>{product.name}</h1>
                  <p className="price">${product.price}</p>
                  <p>
                    <Link
                      key={product.id}
                      className={'navbar-btn'}
                      as={Link}
                      to={'/ver/' + product.id}
                    >
                      <button>Ver más</button>
                    </Link>
                  </p>
                </div>
              ))}
            </div>
 */
