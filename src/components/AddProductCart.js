import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "./../scripts/cartReducer";
import CreateReview from "./CreateReview";
import Review from "./Reviews";
import "./AddProductCart.css";

class AddProductCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      id: "",
      name: "",
      description: "",
      model: "",
      type: "",
      price: "",
      img: "",
      qty: 1,
      idoficial: ""
    };
    this.onClickSaveCart = this.onClickSaveCart.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.productId;

    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/getid/${id}`
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
        idoficial: result.data._id
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  onClickSaveCart() {
    this.props.addToCart(this.state.id, this.state.qty);
    alert("Agregado Existosamente!");
  }

  onChangeQty(e) {
    this.setState({
      qty: e.target.value
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
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img id="product-img-desc" src={this.state.img} />
            </div>
            <div className="col-lg-8">
              <h1>{this.state.name}</h1>
              <h2>$ {this.state.price}</h2>
              <div id="prodduct-description">
                <p>{this.state.description}</p>
                <p>Modelo: {this.state.model}</p>
                <p>Tipo: {this.state.type}</p>
              </div>

              <select id="qty" onChange={this.onChangeQty}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                className="btn btn-primary"
                onClick={this.onClickSaveCart}
              >
                Agregar a carrito
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <Review product={this.state.id}></Review>
          <CreateReview
            product={this.state.id}
            id={this.state.idoficial}
          ></CreateReview>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id, quantity) => {
      dispatch(addToCart(id, quantity));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddProductCart);
