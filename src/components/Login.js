import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { withRouter } from 'react-router';
class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      type: '',
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeType(e) {
    console.log(e.target.value);
    this.setState({ type: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newSession = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(newSession);

    axios
      .post('http://localhost:9000/' + this.state.type + '/login', newSession)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem('sessiontoken', res.data.token);
        //console.log(this.props.history);
        //this.props.history.push("/");
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="login-page">
        <h2>Iniciar sesión</h2>
        <div className="user-form" id="login-user-form">
          <form onSubmit={this.onSubmit.bind(this)} class="login-form">
            <input
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Email"
            />
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Contraseña"
            />
            <label>Tipo de usuario</label>
            <br />

            <input
              type="radio"
              name="type-user"
              value="user"
              onChange={this.onChangeType}
            />
            <label> Cliente</label>
            <br />

            <input
              type="radio"
              name="type-user"
              value="admin"
              onChange={this.onChangeType}
            />
            <label> Encargado de tienda</label>
            <br />

            <button>login</button>
            <p class="message">
              No tienes cuenta? <a href="/usuario/nuevo">Crear una cuenta</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
