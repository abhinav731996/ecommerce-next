"use client";
import { Form, Button } from "react-bootstrap";

export default function Checkout() {
  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group>
          <Form.Label>Payment</Form.Label>
          <Form.Select>
            <option>Card</option>
            <option>UPI</option>
          </Form.Select>
        </Form.Group>

        <Button className="mt-3">Place Order</Button>
      </Form>
    </div>
  );
}