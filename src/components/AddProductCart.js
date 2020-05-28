import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "./../scripts/cartReducer";
import CreateReview from "./CreateReview";
import Review from "./Reviews";
import "./AddProductCart.css";
import { Link } from "react-router-dom";

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
        <div className="container mt-3">
          <div className="row d-flex justify-content-start mb-2">
            <Link as={Link} className="btn btn-outline-dark" to={"/tienda"}>
              <div>Regresar</div>
            </Link>
          </div>

          <div className="row">
            <div className="col-md-6">
              <img id="product-img-desc" src={this.state.img} />
            </div>
            <div id="product-desc-col" className="col-md-6">
              <h1>{this.state.name}</h1>
              <h2>$ {this.state.price}</h2>

              <div id="product-description my-3">
                <p>{this.state.description}</p>
                <div id="specifications">
                  <span>{this.state.model}</span>
                  <span>{this.state.type}</span>
                </div>
              </div>

              <div class="form-group my-3">
                <label>Cantidad:</label>
                <select id="qty" onChange={this.onChangeQty} className="mx-3">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <button
                className="btn btn-primary"
                onClick={this.onClickSaveCart}
              >
                Agregar a carrito
              </button>
            </div>
          </div>
        </div>
        <div id="reviews-container" className="container">
          <h4>Opiniones sobre {this.state.name}</h4>
          <div className="row">
            <div className="col-lg-7">
              <Review product={this.state.id} />
            </div>
            <div id="create-review-container" className="col-lg-5">
              <CreateReview product={this.state.id} id={this.state.idoficial} />
            </div>
          </div>
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
