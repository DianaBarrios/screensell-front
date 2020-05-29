import React, { Component } from "react";
import axios from "axios";
import "./AddProductCart.css";
import { FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

import {
  types,
  changeQty,
  removeItem,
  clearCart
} from "../scripts/cartReducer";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      verifyUpdate: false,
      count: "0",
      checkout: false,
      err: "",
      finalPrice: 0
    };

    this.getProducts = this.getProducts.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.editElement = this.editElement.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.gotoCheckout = this.gotoCheckout.bind(this);
  }
  //8ae245d5-55b0-4526-90d2-9354515a5b49'

  async componentDidMount() {
    this.setState({ count: Object.keys(this.props.addedItems).length });
  }

  getProducts() {
    let components = [];
    this.state.finalPrice = 0;

    for (let index in this.props.products) {
      let product = this.props.products[index];
      if (this.props.addedItems.hasOwnProperty(product.id)) {
        product.qty = this.props.addedItems[product.id].quantity;
        this.state.finalPrice += product.qty * product.price;

        components.push(
          <div className="carrito-container" key={product.id} id={product.id}>
            <div className="row">
              <div className="col-md-4">
                <img src={product.img} alt="Image of product" />
              </div>
              <div className="col-md-3 my-auto">
                <h5>{product.name}</h5>
                <p className="text-muted">{product.description}</p>
              </div>
              <div className="col-md-1 my-auto">
                <select
                  id={product.id}
                  value={product.qty}
                  onChange={this.onChangeQty}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-md-2 my-auto">
                <p>
                  {" "}
                  <strong>${product.qty * product.price}</strong>
                </p>
              </div>
              <div className="col-md-1 my-auto">
                <button onClick={() => this.deleteElement(product.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    //components.push(<div className="container">{finalPrice}</div>);
    return components;
  }

  onChangeQty(e) {
    this.props.changeQty(e.target.id, e.target.value);
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
  }

  async gotoCheckout() {
    await axios
      .get("https://screensell-back.herokuapp.com/user/validate", {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(async result => {
        this.props.history.push("/checkout");
      })
      .catch(err => {
        this.setState({
          err: "Por favor ingresa a tu cuenta antes de hacer checkout."
        });
      });
  }

  editElement(id) {
    let productos = JSON.parse(localStorage.getItem("cart"));
    const index = productos.findIndex(x => x.product === id);
    console.log(index);
  }

  deleteElement(id) {
    this.props.removeItem(id);
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
    this.setState({ count: Object.keys(this.props.addedItems).length });
  }

  render() {
    const { isLoading, err, count } = this.state;

    if (err) {
      return (
        <div>
          <div className="page-content container mt-5">
            <h3>
              {err}
              <Link as={Link} to={"/usuario"} className="text-warning">
                <strong> Ingresar a cuenta</strong>
              </Link>
            </h3>
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

    if (count == 0) {
      return (
        <div>
          <div className="page-content container mt-5">
            <h3>
              Por el momento no hay productos en el carrito, ¿Quieres agregar
              alguno?
              <Link key={10} as={Link} to={"/tienda"} className="text-warning">
                <div className="navbar-btn-legend">
                  {" "}
                  <strong>Ir a tienda </strong>
                </div>
              </Link>
            </h3>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <h2 className="page-title">CARRITO</h2>
          <div className="page-content container">
            <div className="row">
              <div className="col-lg-9">{this.getProducts()}</div>
              <div className="col-lg-3 mt-3">
                <p>
                  Precio Total: <h3>$ {this.state.finalPrice}</h3>
                </p>
                <button className="btn btn-primary" onClick={this.gotoCheckout}>
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    addedItems: state.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeQty: (id, quantity) => {
      dispatch(changeQty(id, quantity));
    },
    removeItem: id => {
      dispatch(removeItem(id));
    },
    clearCart: () => {
      dispatch(clearCart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
