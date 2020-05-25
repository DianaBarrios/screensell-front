import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import axios from 'axios';

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);

    this.state = {
      comment: '',
      user: '',
      product: '',
    };
  }

  onChangeComment(e) {
    console.log(e.target.value);
    this.setState({ comment: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log('props', this.props.product);
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        this.setState({ user: result.data.id });
        const newReview = {
          user: this.state.user,
          comment: this.state.comment,
          product: this.props.product,
        };
        console.log(newReview, 'this');
        await axios
          .post('https://screensell-back.herokuapp.com/review/new', newReview, {
            headers: { sessiontoken: localStorage.getItem('sessiontoken') },
          })
          .then((review) => {
            console.log(review);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      comment: '',
    });
    window.location.reload();
  }

  render() {
    return (
      <div>
        <input type="textarea" onChange={this.onChangeComment}></input>
        <a className="btn" onClick={this.onSubmit}>
          {' '}
          Agregar Review
        </a>
      </div>
    );
  }
}

export default withRouter(CreateReview);
