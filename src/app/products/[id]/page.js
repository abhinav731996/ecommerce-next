"use client";
import { useEffect, useState } from "react";
import { API } from "../../../services/api";
import { useParams } from "next/navigation";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const getProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img src={product.thumbnail} className="img-fluid" />
        </Col>

        <Col md={6}>
          <h3>{product.title}</h3>
          <h4>${product.price}</h4>
          <p>{product.description}</p>

          <Button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;