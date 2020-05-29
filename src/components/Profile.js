import React, { Component } from "react";
import Sidebar from './Sidebar';
import './Profile.css'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentWillMount() {
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then((result) => {
        this.setState({ user: result.data.type });
      })
      .catch((err) => {
        this.setState({ login: true });
      });
  }
  render() {

    return (
      <div className="page-division">
        <Sidebar user={this.state.user} />
        <div className="page-content">
          <h2>MI PERFIL</h2>
          <p>Aqui podras seguir tus ordenes y productos.</p>
        </div>
      </div>
    );
  }
}

export default Profile;