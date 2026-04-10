"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Container, Form, Button, Card } from "react-bootstrap";
import { mockApi } from "@/services/api";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { updateUser } from "@/redux/slices/authSlice";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsClient(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(updateUser(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (isClient && !user) {
      router.push("/auth/login");
    }
  }, [user, isClient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      await mockApi.put(`/users/${user.id}`, payload);

      const updatedUser = { ...user, ...payload };

      dispatch(updateUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile Updated Successfully");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  };

  if (!isClient) return null;

  return (
    <>
      <Header />

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <h3 className="mb-3">Edit Profile</h3>

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Update Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="success"  onClick={() => router.push("/auth/login")}>
              Update Profile
            </Button>
          </Form>
        </Card>
      </Container>

      <Footer />
    </>
  );
}