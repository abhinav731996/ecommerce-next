"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Form, Button, Container } from "react-bootstrap";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(form));

    // wait thoda (redux update ke liye)
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === form.email &&
        storedUser.password === form.password
      ) {
        router.push("/");
      }
    }, 200);
  };

  return (
    <Container className="mt-4">
      <h3>Sign In</h3>

      <Form onSubmit={handleSubmit}>
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

        <Button type="submit">Login</Button>
      </Form>

      <hr />
      Create a new account?
      <br />
      <Button as={Link} href="/auth/register">
        Sign-up
      </Button>
    </Container>
  );
}