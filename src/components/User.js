import React, { Component } from 'react';
import Sidebar from './Sidebar';
import HasAccount from './HasAccount';
import Login from './Login';

import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      cellphone: '',
      address: '',
      password: '',
      isLoading: false,
      error: null,
      login: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCellphone = this.onChangeCellphone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      user: {
        firstName: e.target.value,
      },
    });
  }

  onChangeLastName(e) {
    this.setState({
      user: {
        lastName: e.target.value,
      },
    });
  }

  onChangeEmail(e) {
    this.setState({
      user: {
        email: e.target.value,
      },
    });
  }

  onChangeCellphone(e) {
    this.setState({
      user: {
        cellphone: e.target.value,
      },
    });
  }

  onChangeAddress(e) {
    this.setState({
      user: {
        address: e.target.value,
      },
    });
  }

  async handleUpdate(e) {
    e.preventDefault();

    const userObj = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      cellphone: this.state.cellphone,
      address: this.state.address,
    };

    this.setState({ isLoading: true });
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .patch(
            'https://screensell-back.herokuapp.com/' +
              result.data.type +
              '/' +
              result.data.id,
            userObj,
            {
              headers: { sessiontoken: localStorage.getItem('sessiontoken') },
            }
          )
          .then((user) => {
            this.setState({
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

  onClickLogout(e) {
    localStorage.removeItem('sessiontoken');
    this.props.history.push('/');
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .get(
            'https://screensell-back.herokuapp.com/' +
              result.data.type +
              '/' +
              result.data.id,
            {
              headers: { sessiontoken: localStorage.getItem('sessiontoken') },
            }
          )
          .then((user) => {
            this.setState({
              id: user.data.id,
              firstName: user.data.firstName,
              lastName: user.data.lastName,
              email: user.data.email,
              cellphone: user.data.cellphone,
              address: user.data.address,
              password: user.data.password,
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

  render() {
    const { isLoading, error, user } = this.state;

    if (error) {
      return <Login />;
    }

    if (isLoading) {
      return <p>Cargando usuario...</p>;
    }

    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3 px-4">
          <h2 className="page-title">¡Hola {this.state.firstName}! </h2>

          <div className="row d-flex justify-content-end mt-4 mx-3">
            <button
              onClick={this.onClickLogout}
              className="btn btn-outline-dark mr-5"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="container mt-3">
            <form id="user-profile-form" onSubmit={this.handleUpdate}>
              <div className="row">
                <div className="col-lg-6">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="col-lg-6">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    readOnly
                    required
                  />
                </div>
                <div className="col-lg-6">
                  <label>Celular</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="cellphone"
                    value={this.state.cellphone}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <label>Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end my-3">
                <button
                  type="submit"
                  value="Update User"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
