"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API } from "../../../services/api";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  const id = params?.id;

useEffect(() => {
  if (!id) return;

  const getProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  getProduct();
}, [id]);

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }
console.log("ID:", id);
  return (
    <Container className="mt-4">
      
      <Button variant="secondary" onClick={() => router.back()}>
        ← Back
      </Button>

      <Row className="mt-3">
        <Col md={6}>
          <img src={product.thumbnail} className="img-fluid" />
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <h4>${product.price}</h4>
          <p>{product.description}</p>

          <Button variant="success">Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;