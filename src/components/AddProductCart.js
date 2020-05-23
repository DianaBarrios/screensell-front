import React, { Component } from 'react';
import axios from 'axios';
import './AddProductCart.css';

class AddProductCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      id: '',
      name: '',
      description: '',
      model: '',
      type: '',
      price: '',
      img: '',
      qty: 1,
    };
    this.onClickSaveCart = this.onClickSaveCart.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
  }

  async componentWillMount() {
    const id = this.props.match.params.productId;

    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `http://localhost:9000/product/getid/${id}`
      );
      this.setState({
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        model: result.data.model,
        type: result.data.type,
        price: result.data.price,
        stock: result.data.stock,
        img: result.data.img,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  onClickSaveCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    let producto = {
      qty: this.state.qty,
      product: this.state.id,
    };
    cart.push(producto);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    this.props.history.push('/tienda');
  }
  onChangeQty(e) {
    this.setState({
      qty: e.target.value,
    });
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
      <div className="container mt-3">
        <div className="col-lg-2">
          <img src={this.state.img} />
        </div>
        <div>
          <h2>{this.state.name}</h2>
          <h4>{this.state.description}</h4>
          <h4>{this.state.model}</h4>
          <h4>{this.state.description}</h4>
          <h4>{this.state.type}</h4>
          <h4>$ {this.state.price}</h4>
        </div>
        <select id="qty" onChange={this.onChangeQty}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="btn" onClick={this.onClickSaveCart}>
          Agregar a carrito
        </button>
      </div>
    );
  }
}

export default AddProductCart;
