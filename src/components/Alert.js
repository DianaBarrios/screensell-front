import React, { Component } from 'react';
import FileUpload from './FileUpload';
import Alert from 'react-bootstrap/Alert';
import './Alert.css';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  componentWillMount() {
    this.handleShow();
  }

  handleShow = () => {
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 2000);
  };

  render() {
    return (
      <Alert show={this.state.show} variant={this.props.variant}>
        {this.props.message}
      </Alert>
    );
  }
}

export default Home;
