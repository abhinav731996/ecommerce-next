"use client";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { Check2 } from "react-bootstrap-icons";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  const inCart = cartState?.cartItems?.some((item) => item.id === product.id);

  const inWishlist = wishlistState?.wishlistItems?.some(
    (item) => item.id === product.id,
  );

  //  Add to Cart
  const handleAddToCart = () => {
    if (inCart) {
      toast.warning("Already in cart !!");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  //  Add to Wishlist
  const handleAddToWishlist = () => {
    if (inWishlist) {
      toast.warning("Already in wishlist ");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist ");
    }
  };

  return (
    <Card className="h-100 text-center shadow-sm">
      {/* IMAGE CLICK */}
      <Link href={product?.id ? `/product/${product.id}` : "#"}>
        <Card.Img src={product.thumbnail} />
      </Link>

      <Card.Body>
        {/* TITLE */}
        <Card.Title>
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {product.title}
          </Link>
        </Card.Title>

        <Card.Text>${product.price}</Card.Text>

        <div className="d-flex justify-content-between">
          {/*  CART BUTTON */}
          <Button variant="primary" onClick={handleAddToCart}>
            {inCart ? (
              <>
                Cart <Check2 />
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>

          {/*  WISHLIST BUTTON */}
          <Button variant="outline-danger" onClick={handleAddToWishlist}>
            {inWishlist ? (
              <>
                Wishlist <Check2 />
              </>
            ) : (
              "Wishlist"
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
