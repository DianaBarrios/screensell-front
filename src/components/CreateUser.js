import React, { Component } from 'react';
import { withRouter } from 'react-router'
import axios from 'axios';

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
      cellphone: ''
    }
  }

  onChangefirstName(e) {
    this.setState({ firstName: e.target.value })
    console.log(e.target.value)
  }

  onChangeLastName(e) {
    this.setState({ lastName: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onChangeAddress(e) {
    this.setState({ address: e.target.value })
  }

  onChangePassword2(e) {
    this.setState({ password2: e.target.value })
  }
  onChangeCellhone(e) {
    this.setState({ cellphone: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      cellphone: this.state.cellphone
    };

    axios.post('https://screensell-back.herokuapp.com/user/new', newUser)
      .then((res) => {
        this.props.history.push("/");
      }).catch((error) => {
        console.log(error)
      });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      cellphone: ''
    })
  }

  render() {
    return (
      <div className="page-division">
        <div>
          <h2>Completa tus datos</h2>
          <div>
            <form onSubmit={this.onSubmit} className="create-user-form">
              <div className="form-group">
                <label>
                  Nombre(s):
							</label>
                <input id="firstName" type="text" className="form-control" value={this.state.firstName} onChange={this.onChangefirstName} />
              </div>

              <div className="form-group">
                <label>
                  Apellidos:
							</label>
                <input id="lastName" type="text" className="form-control" value={this.state.lastName} onChange={this.onChangeLastName} />
              </div>

              <div className="form-group">
                <label>
                  Email:
							</label>
                <input id="email" type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
              </div>

              <div className="form-group">
                <label>
                  Contraseña:
							</label>
                <input id="password" type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
              </div>
              <div className="form-group">
                <label>
                  Repite contraseña:
							</label>
                <input id="password2" type="password" className="form-control" value={this.state.password2} onChange={this.onChangePassword2} />
              </div>

              <div className="form-group">
                <label>
                  Dirección:
							</label>
                <input id="address" type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} />
              </div>
              <div className="form-group">
                <label>
                  Teléfono celular:
							</label>
                <input id="cellphone" type="text" className="form-control" value={this.state.cellphone} onChange={this.onChangeCellhone} />
              </div>
              <button type="submit" value="Crear cuenta">
                Crear cuenta
						</button>
            </form>
          </div>
        </div>
      </div>
    )

  }
}

export default CreateUser;
