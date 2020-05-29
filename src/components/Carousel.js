import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer
} from "mdbreact";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="homepage-carousel">
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://screensell-bucket.s3.amazonaws.com/img4.jpeg"
                  alt="Fixed phone"
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption className="carousel-caption">
                <h3 className="h3-responsive text-black">Pantallas y Touch Screens</h3>
                <p>Encuentra la pantalla o touch de tu celular o tablet</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://screensell-bucket.s3.amazonaws.com/img2.jpeg"
                  alt="Broken phone"
                />
                <MDBMask overlay="black-strong"/>
              </MDBView>
              <MDBCarouselCaption className="carousel-caption">
                <h3 className="h3-responsive">Mayor variedad de marcas</h3>
                <p>¿No encuentras tu pantalla? Mándanos un mensaje</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://screensell-bucket.s3.amazonaws.com/img1.jpeg"
                  alt="Tablet open"
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption className="carousel-caption">
                <h3 className="h3-responsive">Venta de mayoreo</h3>
                <p>Precio especial para técnicos</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default Carousel;
