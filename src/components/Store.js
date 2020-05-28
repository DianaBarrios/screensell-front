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

  async fetchAllProducts(){
    this.setState({ isLoading: true });
      try {
        const result = await axios.get(
          "https://screensell-back.herokuapp.com/product/"
        );
        this.setState({
          products: result.data,
          isLoading: false
        });
        console.log("after fetch:", this.state.products);
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
  }

  async componentDidMount() {
    console.log("component mount: ", this.state.products);
    if (typeof this.props.location.state !== "undefined") {
      if(typeof this.props.history.location.state !== "undefined"){
        console.log("los dos son defined")
        console.log("state de store antes del set: ",this.state.products) 
        this.setState({
          products: this.props.location.state.products
        });
        //console.log("state de store despues del set: ",this.state.products)
        
      } else {
        console.log("location-state esta defnido pero history location no")
        this.fetchAllProducts();
      }   
    } else {
      console.log("los dos son undefined")
      this.fetchAllProducts();
    }
    console.log("state de store despues del set: ",this.state.products)
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
                  <div
                    key={product.id}
                    id={product.id}
                    className="card mt-4"
                    onClick={() => this.handleClickOnProduct(product.id)}
                  >
                    <div class="card-header">
                      {" "}
                      <i className="fa fa-shopping-cart"></i>{" "}
                    </div>
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
                          className={"navbar-btn"}
                          as={Link}
                          to={"/ver/" + product.id}
                        >
                          <button className="btn btn-outline-primary">
                            Ver más
                          </button>
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
