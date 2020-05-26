import React, { Component } from 'react';
import axios from 'axios';
import './AddProductCart.css';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

import {
  types,
  changeQty,
  removeItem,
  clearCart,
} from '../scripts/cartReducer';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      verifyUpdate: false,
      count: '0',
      checkout: false,
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
    let finalPrice = 0;

    for (let index in this.props.products) {
      let product = this.props.products[index];
      if (this.props.addedItems.hasOwnProperty(product.id)) {
        product.qty = this.props.addedItems[product.id].quantity;
        finalPrice += product.qty * product.price;
        components.push(
          <tr key={product.id} id={product.id}>
            <td key="p">{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>
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
            </td>
            <td>{product.qty * product.price}</td>
            <td>
              <button onClick={() => this.deleteElement(product.id)}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        );
      }
    }
    components.push(
      <tr key={123} id={123}>
        <td key="p"></td>
        <td></td>
        <td></td>
        <td>Total</td>
        <td>{finalPrice}</td>
      </tr>
    );
    return components;
  }

  onChangeQty(e) {
    this.props.changeQty(e.target.id, e.target.value);
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
  }

  gotoCheckout() {
    this.props.history.push('/checkout');
  }

  editElement(id) {
    let productos = JSON.parse(localStorage.getItem('cart'));
    const index = productos.findIndex((x) => x.product === id);
    console.log(index);
  }

  deleteElement(id) {
    this.props.removeItem(id);
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
    this.setState({ count: Object.keys(this.props.addedItems).length });
  }

  render() {
    const { isLoading, error, count } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    if (count == 0) {
      return (
        <div>
          <p>
            Por el momento no hay productos en el carrito, ¿Quieres agregar
            alguno?
          </p>
          <Link key={10} as={Link} to={'/tienda'}>
            <div className="navbar-btn-legend">Ir a tienda</div>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <table className="table table-hover px-3">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Modelo</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>{this.getProducts()}</tbody>
        </table>
        <button className="btn btn-primary" onClick={this.gotoCheckout}>
          Proceder al pago
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    addedItems: state.addedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeQty: (id, quantity) => {
      dispatch(changeQty(id, quantity));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    clearCart: () => {
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
