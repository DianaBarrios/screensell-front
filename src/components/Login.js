import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
    axios
      .post('http://localhost:9000/' + this.state.type + '/login', newSession)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem('sessiontoken', res.data.token);
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
      <div className="page-division">
        <div>
          <h2>¿Tienes cuenta?</h2>
          <div>
            <form onSubmit={this.onSubmit} className="login-user-form">
              <div className="form-group">
                <label>Email:</label>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="form-group">
                <label>Tipo de usuario: </label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="type-user"
                      value="user"
                      onChange={this.onChangeType}
                    ></input>
                    Cliente
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="type-user"
                      value="admin"
                      onChange={this.onChangeType}
                    ></input>
                    Encargado de tienda
                  </label>
                </div>
              </div>
              <button type="submit" value="Ingresar a cuenta" href="/tienda">
                Ingresar a cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
