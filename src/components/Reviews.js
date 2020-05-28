import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import './Review.css'

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isLoading: false,
      noComments: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/review/byProduct/${this.props.product}`,
        {
          headers: { sessiontoken: localStorage.getItem("sessiontoken") }
        }
      );
      if (result.data.length == 0) {
        this.setState({
          noComments: true,
          isLoading: false
        });
      } else {
        this.setState({
          reviews: result.data,
          isLoading: false
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, reviews, noComments } = this.state;

    if (isLoading) {
      return <p>Cargando comentarios ... </p>;
    }

    if (noComments) {
      return (
        <p>
          <strong> No existen comentarios para este producto.</strong>
        </p>
      );
    }

    return (
      <div>
        {reviews.map(review => (
          <div className="container review-container" key={review.id} id={review.id}>
            <p id="author-comment" className="mb-0">{review.comment}</p>
            <p id="author">{review.user.firstName} {review.user.lastName} </p>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(CreateReview);

/*
<table className="table table-hover ">
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} id={review.id}>
                <td>
                  {review.user.firstName} {review.user.lastName}
                </td>
                <td>{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
*/
