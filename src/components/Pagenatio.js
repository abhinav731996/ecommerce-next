'use client'

import { Carousel } from "react-bootstrap";

const Pagination = () => {
  return (
    <div className="">
      <Carousel className='rounded'>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-psd/super-sale-50-off-3d-promotion-banner-with-editable-text_47987-20297.jpg?semt=ais_rp_progressive&w=740&q=80"
            alt="First slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Discover Amazing Products</h3>
            <p>Find the best items curated just for you</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1932721696/vector/save-big-sale-sign-label-icon-stock-vector-illustration.jpg?s=612x612&w=0&k=20&c=C5Cwul_I035AFPtsZ33jUJx0ogZVIQzQI8iqVKbVSl0="
            alt="Second slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3 >Exclusive Deals</h3>
            <p>Exclusive Deals</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.shutterstock.com/image-vector/big-savings-on-red-background-600nw-2376125501.jpg"
            alt="Third slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Shop & Save Big</h3>
            <p>Limited time offers available now</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default Pagination;

// imporve this component by adding dynamic images and captions from props or API, and also add indicators and controls for better navigation.