import React, { Component } from 'react';
import Sidebar from './Sidebar';
import HasAccount from './HasAccount';

import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: false,
      error: null,
      login: false,
    };
    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  onClickLogout(e) {
    localStorage.removeItem('sessiontoken');
    this.props.history.push('/');
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    await axios
      .get('http://localhost:9000/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .get(
            'http://localhost:9000/' + result.data.type + '/' + result.data.id,
            {
              headers: { sessiontoken: localStorage.getItem('sessiontoken') },
            }
          )
          .then((user) => {
            this.setState({
              user: user.data,
              isLoading: false,
            });
          });
      })
      .catch((error) => {
        this.setState({
          error,
          isLoading: false,
          login: true,
        });
      });
  }

  handleClickOnProduct(id) {}

  render() {
    const { isLoading, error, user } = this.state;

    if (error) {
      return <HasAccount />;
    }

    if (isLoading) {
      return <p>Cargando usuario...</p>;
    }

    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3">
          <h2 className="page-title">¡Hola {user.firstName}! </h2>
          <div className="row d-flex justify-content-end">
            <a href="/usuario/actualizar" className="btn btn-primary mr-5">
              Cuenta
            </a>
          </div>

          <div className="container mt-3">
            <h3>Nombre: {user.firstName}</h3>
            <h3>Apellidos: {user.lastName}</h3>
            <h3>Email: {user.email}</h3>
            <button onClick={this.onClickLogout}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
