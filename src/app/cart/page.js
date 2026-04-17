"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../redux/slices/cartSlice";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockApi } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash on Delivery");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalTotal = total - discount;

  const applyCoupon = () => {
    if (code === "SAVE10") {
      setDiscount(total * 0.1);
      toast.success("Coupon Applied");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon");
    }
  };

  //  PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login first");
      router.push("/auth/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Cart is empty");
      return;
    }

    try {
      const order = {
        userId: user.id,
        items: cartItems,
        total: finalTotal,
        paymentMode,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await mockApi.post("/orders", order);

      toast.success("Order Placed Successfully");

      dispatch(clearCart());

      router.push("/account/orders");
    } catch (err) {
      console.error(err);
      toast.error("Order Failed");
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h3>Shopping Cart</h3>

        {cartItems.length === 0 ? (
          <h5 className="text-center mt-5">Cart is empty</h5>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center mb-3 border p-3"
            >
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ height: "80px", width: "80px", objectFit: "cover" }}
                />

                <div>
                  <h6>{item.title}</h6>
                  <p>${item.price}</p>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      -
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      size="sm"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h6>${item.price * item.quantity}</h6>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}

        <hr />

        <h4>Total: ${total.toFixed(2)}</h4>

        {/* COUPON */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Enter coupon"
            className="me-2"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button size="sm" onClick={applyCoupon}>
            Apply
          </Button>
        </div>

        <h5 className="mt-2">Discount: ${discount.toFixed(2)}</h5>
        <h4>Final Total: ${finalTotal.toFixed(2)}</h4>

        <hr />

        {/* PAYMENT */}
        <h5>Payment Mode</h5>
        <Form.Select
          className="mb-3"
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Debit Card</option>
          <option>Credit Card</option>
        </Form.Select>

        <Button variant="success" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>

      <Footer />
    </>
  );
}
