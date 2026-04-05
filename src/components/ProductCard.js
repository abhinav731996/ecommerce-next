"use client";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card>
      <Card.Img src={product.thumbnail} />
      <Card.Body>
        <Card.Title>
          <Link href={`/product/${product.id}`}>{product.title}</Link>
        </Card.Title>
        <Card.Text>${product.price}</Card.Text>

        <Button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
