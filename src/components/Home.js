import React, { Component } from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <Carousel />
          </div>

          <div className="d-flex justify-content-between mt-5">
            <h3>VARIEDAD DE MARCAS</h3>
            <Link as={Link} to={"/tienda"} className="home-link">
              <div>Ver más...</div>
            </Link>
          </div>
          <div className="row">
            <div id="row-variedad-marcas" className="card-deck mt-3 mb-4">
              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/freestocks-L5DxWLmywmM-unsplash.jpg"
                  className="card-img"
                  alt="Apple phone"
                />
                <Link
                  as={Link}
                  to={"/tienda?q=apple"}
                  className="home-card-link"
                >
                  <div className="card-img-overlay">
                    <h4 className="card-title">Apple</h4>
                  </div>
                </Link>
              </div>
              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/lacie-slezak-eJsh9LKnX_A-unsplash.jpg"
                  className="card-img"
                  alt="Samsung phone"
                />
                <Link
                  as={Link}
                  to={"/tienda?q=samsung"}
                  className="home-card-link"
                >
                  <div className="card-img-overlay">
                    <h4 className="card-title">Samsung</h4>
                  </div>
                </Link>
              </div>

              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/sebastian-hietsch-RUJYUXwj3s0-unsplash%281%29.jpg"
                  className="card-img"
                  alt="Huawei phone"
                />
                <Link as={Link} to={"/tienda?q=huawei"} className="home-card-link">
                  <div className="card-img-overlay">
                    <h4 className="card-title">Huawei</h4>
                  </div>
                </Link>
              </div>
              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/yura-fresh-C6Jvxlj4sRQ-unsplash.jpg"
                  className="card-img"
                  alt="Generic Tablet"
                />
                <Link as={Link} to={"/tienda"} className="home-card-link">
                  <div className="card-img-overlay">
                    <h4 className="card-title">Muchas más...</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <h3>CATEGORÍAS</h3>
            <Link as={Link} to={"/tienda"} className="home-link">
              <div>Explorar...</div>
            </Link>
          </div>

          <div className="row">
            <div id="row-variedad-marcas" className="card-deck mt-3 mb-4">
              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/img3.jpeg"
                  className="card-img"
                  alt="celulares-section"
                />
                <Link
                  as={Link}
                  to={"/tienda?q=celular"}
                  className="home-card-link"
                >
                  <div className="card-img-overlay">
                    <h4 className="card-title">Celulares</h4>
                  </div>
                </Link>
              </div>
              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/henry-ascroft-7OFnb7NOvjw-unsplash.jpg"
                  className="card-img"
                  alt="tablet-section"
                />
                <Link
                  as={Link}
                  to={"/tienda?q=tablet"}
                  className="home-card-link"
                >
                  <div className="card-img-overlay">
                    <h4 className="card-title">Tablets</h4>
                  </div>
                </Link>
              </div>

              <div className="card bg-light text-white">
                <img
                  src="https://screensell-bucket.s3.amazonaws.com/eirik-solheim-mWTOR3Rx8l8-unsplash.jpg"
                  className="card-img"
                  alt="more-section"
                />
                <Link as={Link} to={"/tienda"} className="home-card-link">
                  <div className="card-img-overlay">
                    <h4 className="card-title">Mucho más...</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
