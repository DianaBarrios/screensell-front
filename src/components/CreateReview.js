import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import axios from 'axios';

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.userOwns = this.userOwns.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);

    this.state = {
      comment: '',
      user: '',
      product: '',
      owns: [],
      productReview: false,
      errComment: false,
      errReview: false
    };
  }
  async userOwns() {
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      }).then(async result => {
        await axios
          .get('https://screensell-back.herokuapp.com/user/' + result.data.id, {
            headers: { sessiontoken: localStorage.getItem('sessiontoken') },
          }).then(user => {
            this.setState({ owns: user.data.owns });
          })
      })
    const index = this.state.owns.findIndex((x) => x == this.props.id);

    if (index == -1) {
      this.setState({ productReview: false });
    } else {
      this.setState({ productReview: true });
    }
  }

  onChangeComment(e) {
    this.setState({ comment: e.target.value });
  }

  componentDidMount() {
    this.userOwns();
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.state.comment != '' && this.state.productReview) {
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
            .post(
              'https://screensell-back.herokuapp.com/review/new',
              newReview,
              {
                headers: { sessiontoken: localStorage.getItem('sessiontoken') },
              }
            )
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
    } else {
      if (this.state.productReview) {
        this.setState({ errReview: "Necesitas haber comprado este producto anteriormente para poder comentar." })
      }
      if (this.state.comment != '') {
        this.setState({ errComment: "Necesitas agregar un comentario antes de presionar enter" });
      }
    }
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
