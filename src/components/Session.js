import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

class Session extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      model: '',
      type: '',
      stock: ''
    }
  }

  userwithtoken(props) {

  }

  render() {
    return;

  }
}

export default Session;
