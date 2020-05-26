import React, { Component } from 'react';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { connect } from 'react-redux';
import axios from 'axios';
import './Checkout.css';
import FileUpload from './FileUpload';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: '',
      cellphone: '',
      nameCard: '',
      numberCard: '',
      expMonth: '0',
      expYear: '0',
      cvv: '000',
      verifyUpdate: true,
    };
    this.onChangeNumberCard = this.onChangeNumberCard.bind(this);
    this.onChangeNameCard = this.onChangeNameCard.bind(this);
    this.onChangeExpYear = this.onChangeExpYear.bind(this);
    this.onChangeExpMonth = this.onChangeExpMonth.bind(this);
    this.onChangeCvv = this.onChangeCvv.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  onChangeNameCard(e) {
    this.setState({
      nameCard: e.target.value,
    });
  }

  onChangeNumberCard(e) {
    this.setState({
      numberCard: e.target.value,
    });
  }
  onChangeExpYear(e) {
    this.setState({
      expYear: e.target.value,
    });
  }
  onChangeExpMonth(e) {
    this.setState({
      expMonth: e.target.value,
    });
  }
  onChangeCvv(e) {
    this.setState({
      cvv: e.target.value,
    });
  }

  goHome() {
    window.localStorage.removeItem('cart');
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
    this.props.history.push('/');
  }
  async componentWillMount() {
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .get(`https://screensell-back.herokuapp.com/user/${result.data.id}`, {
            headers: { sessiontoken: localStorage.getItem('sessiontoken') },
          })
          .then((user) => {
            this.setState({
              address: user.data.address,
              cellphone: user.data.cellphone,
              email: user.data.email,
              name: `${user.data.firstName} ${user.data.lastName}`,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      name: '',
      email: '',
      address: '',
      cellphone: '',
      nameCard: '',
      numberCard: '',
      expMonth: '0',
      expYear: '0',
      cvv: '000',
      verifyUpdate: true,
    });
    this.goHome();
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
            <td>{product.model}</td>
            <td>{product.qty}</td>
            <td>{product.qty * product.price}</td>
          </tr>
        );
      }
    }
    components.push(
      <tr key={123} id={123}>
        <td key="p"></td>
        <td></td>
        <td>Total</td>
        <td>{finalPrice}</td>
      </tr>
    );
    return components;
  }

  render() {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <div className="address-form">
          <h3>Billing Address</h3>
          <label for="fname">
            <i class="fa fa-user"></i> Full Name
          </label>
          <input
            type="text"
            id="fname"
            value={this.state.name}
            disabled
          ></input>
          <label for="fname">
            <i class="fa fa-envelope"></i> Email
          </label>
          <input
            type="text"
            id="fname"
            placeholder="John M. Doe"
            value={this.state.email}
            disabled
          ></input>
          <label for="fname">
            <i class="fa fa-address-card-o"></i> Address
          </label>
          <input
            type="text"
            id="fname"
            placeholder="John M. Doe"
            value={this.state.address}
            disabled
          ></input>
          <label for="fname">
            <i class="fa fa-phone"></i> Cellphone
          </label>
          <input
            type="text"
            id="fname"
            placeholder="John M. Doe"
            value={this.state.cellphone}
            disabled
          ></input>
        </div>

        <div className="payment-form">
          <h3>Payment </h3>
          <label for="fname"> Accepted Cards </label>
          <div className="icon-container">
            <FaCcMastercard></FaCcMastercard>
            <FaCcVisa></FaCcVisa>
          </div>
          <label for="cname"> Name on card</label>
          <input
            type="text"
            id="cname"
            onChange={this.onChangeNameCard}
            placeholder="John M. Doe"
          ></input>
          <label for="cnumber"> Credit card number</label>
          <input
            type="text"
            id="cnumber"
            placeholder="4556901963026900"
            onChange={this.onChangeNumberCard}
          ></input>
          <div className="numbers-card">
            <label for="cexp">Exp Month</label>
            <input
              type="text"
              id="cexp"
              placeholder="10"
              pattern=".{2,}"
              title="El mes de expiración es un valor con 2 dígitos"
              onChange={this.onChangeExpMonth}
            ></input>
            <label for="cexpyear">Exp Year</label>
            <input
              type="text"
              id="cexpyear"
              placeholder="20"
              pattern=".{2,}"
              title="El año de expiración es un valor con 2 dígitos"
              onChange={this.onChangeExpYear}
            ></input>
            <label for="cexpyear">CVV</label>
            <input
              type="password"
              id="cexpyear"
              placeholder="123"
              pattern=".{3,}"
              title="El CVV es un valor con 3 dígitos"
              onChange={this.onChangeCvv}
            ></input>
          </div>
        </div>
        <div>
          <table className="table table-hover px-3">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Modelo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>{this.getProducts()}</tbody>
          </table>
          <button className="btn btn-primary" onClick={this.onSubmit}>
            Pagar
          </button>
        </div>
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

export default connect(mapStateToProps, null)(CreateProduct);
