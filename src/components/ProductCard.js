"use client";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

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
        <div className="d-flex justify-content-between">
        <Button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => dispatch(addToWishlist(product))}
        >
          Wishlist
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
