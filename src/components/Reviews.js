import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    console.log('este es el productid', this.props.product);
    console.log(
      `https://screensell-back.herokuapp.com/review/byProduct/${this.props.product}`
    );
    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/review/byProduct/${this.props.product}`,
        {
          headers: { sessiontoken: localStorage.getItem('sessiontoken') },
        }
      );
      this.setState({
        reviews: result.data,
        isLoading: false,
      });
    } catch (error) {
      console.log('esta jalando??????');

      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, reviews } = this.state;
    if (isLoading) {
      return <p>Cargando comentarios ... </p>;
    }

    return (
      <div>
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
      </div>
    );
  }
}

export default withRouter(CreateReview);
