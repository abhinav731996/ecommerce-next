"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");

  const applyCoupon = () => {
    if (code === "SAVE10") {
      setDiscount(total * 0.1);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mt-4">
      <h3>Shopping Cart</h3>

      {cartItems.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-3">
          <div>
            <h5>{item.title}</h5>
            <p>
              ${item.price} x {item.quantity}
            </p>
          </div>

          <Button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </Button>
        </div>
      ))}
      <h4>Total: ${total}</h4>
      <div>Apply Coupon Code</div>

      <input
        type="text"
        placeholder="Enter coupon"
        onChange={(e) => setCode(e.target.value)}
      />{" "}

      <Button onClick={applyCoupon} size='sm'>Apply</Button>

      <h5>Discount: ${discount}</h5>
      <h4>Final Total: ${total - discount}</h4>
    </div>
  );
}
