import React, { Component } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import "./Store.css";
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

  async fetchAllProducts() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(
        "https://screensell-back.herokuapp.com/product/"
      );
      this.setState({
        products: result.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  async fetchQueryProducts(q) {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/getResult/${q}`
      );
      this.setState({
        products: result.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log("after: ", prevProps);
    console.log("now: ", this.props);
    if (this.props.location.search !== prevProps.location.search) {
      if (this.props.location.search == "") {
        this.fetchAllProducts();
      } else {
        let search = this.props.location.search;
        let query = search.substring(search.indexOf("=") + 1);
        this.fetchQueryProducts(query);
      }
    }
  }

  async componentDidMount() {
    if (this.props.location.search == "") {
      this.fetchAllProducts();
    } else {
      let search = this.props.location.search;
      let query = search.substring(search.indexOf("=") + 1);
      this.fetchQueryProducts(query);
    }
  }

  handleClickOnProduct(id) {
    let newPath = `/ver/${id}`;
    this.props.history.push(newPath);
  }

  render() {
    const { products, isLoading, error } = this.state;

    if (error) {
      return (
        <div className="page-divisionrow">
          <div className="col-lg-12">
            <div className="page-content mt-3">
              <h1>Lo sentimos,</h1>
              <h3>Por el momento no contamos con este producto</h3>
              <p>Sigue explorando nuestra tienda online!</p>
              <Link as={Link} className="btn btn-outline-dark" to={"/tienda"}>
                <div>Regresar</div>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="page-content">
          <p>Cargando...</p>
        </div>
      );
    }

    return (
      <div className="page-division row">
        <div className="col-lg-12">
          <div className="page-content mt-3 mb-5">
            <div className="container">
              <p className="text-right">
                {this.state.products.length} resultados...
              </p>
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
                          <small class="text-muted">
                            {product.description}
                          </small>
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
      </div>
    );
  }
}

export default Store;

/*
if (typeof this.props.location.state !== "undefined") {
      if (typeof this.props.history.location.state !== "undefined") {
        //console.log("los dos son defined");
        //console.log("state de store antes del set: ", this.state.products);
        this.setState({
          products: this.props.location.state.products
        });
        console.log("state de store despues del set: ",this.state.products)
      } else {
        //console.log("location-state esta defnido pero history location no");
        this.fetchAllProducts();
      }
    } else {
      //console.log("los dos son undefined");
      this.fetchAllProducts();
    }
*/
