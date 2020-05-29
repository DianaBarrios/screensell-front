import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import './Login.css';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCellhone = this.onChangeCellhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      cellphone: '',
    };
  }

  onChangefirstName(e) {
    this.setState({ firstName: e.target.value });
    console.log(e.target.value);
  }

  onChangeLastName(e) {
    this.setState({ lastName: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  onChangePassword2(e) {
    this.setState({ password2: e.target.value });
  }
  onChangeCellhone(e) {
    this.setState({ cellphone: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      cellphone: this.state.cellphone,
    };

    axios
      .post('https://screensell-back.herokuapp.com/user/new', newUser)
      .then((res) => {
        localStorage.setItem('sessiontoken', res.data.token);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      cellphone: '',
    });
  }

  render() {
    return (
      <div className="register-page">
        <h2>Crear cuenta</h2>
        <div className="user-form" id="register-user-form">
          <form onSubmit={this.onSubmit} className="login-form">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      id="firstName"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.onChangefirstName}
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      id="lastName"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.onChangeLastName}
                      placeholder="Apellidos"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      id="cellphone"
                      type="tel"
                      value={this.state.cellphone}
                      onChange={this.onChangeCellhone}
                      placeholder="Celular"
                      pattern="[0-9]{10}"
                      maxlength="12"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      placeholder="Email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      id="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      id="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChangePassword2}
                      placeholder="Repite tu contraseña"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <input
              id="address"
              type="text"
              value={this.state.address}
              onChange={this.onChangeAddress}
              placeholder="Dirección"
              required
            />

            <button type="submit">Crear</button>
            <p className="message">
              Ya tienes cuenta? <a href="/usuario/login">Inicia sesión</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateUser);
