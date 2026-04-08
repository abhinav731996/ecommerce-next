"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Form, Button, Container } from "react-bootstrap";
import Link from "next/link";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(form));
    alert("Registered Successfully");
    router.push("/auth/login");
  };

  return (
    <Container className="mt-4">
      <h3>Sign Up</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </Form.Group>

        <Button type="submit">Register</Button>
      </Form>
      <hr/>
      Back to login page:-
      <br/>
        <Button type="submit" as={Link} href="/auth/login">Login</Button>
    </Container>
  );
}
