"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { Button } from "react-bootstrap";

export default function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h3>Wishlist</h3>

      {items.map((item) => (
        <div key={item.id} className="d-flex justify-content-between">
          <p>{item.title}</p>
          <img src={product.thumbnail} className="img-fluid" />

          <Button
            onClick={() => dispatch(removeFromWishlist(item.id))}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}