import React, { Component } from 'react';
import axios from 'axios';
import './AddProductCart.css';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
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
    };

    this.getProducts = this.getProducts.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.editElement = this.editElement.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.gotoCheckout = this.gotoCheckout.bind(this);
  }
  //8ae245d5-55b0-4526-90d2-9354515a5b49'

  getProducts() {
    let components = [];
    for (let index in this.props.products) {
      let product = this.props.products[index];
      if (this.props.addedItems.hasOwnProperty(product.id)) {
        product.qty = this.props.addedItems[product.id].quantity;
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
            <td>
              <button onClick={() => this.deleteElement(product.id)}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        );
      }
    }
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
  }

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    return (
      <div>
        <table className="table table-hover px-3">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Modelo</th>
              <th scope="col">Precio</th>
              <th scope="col">Tipo</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>{this.getProducts()}</tbody>
        </table>
        <button className="btn" onClick={this.gotoCheckout}>
          Go to checkout
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
