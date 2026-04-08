"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const orders = useSelector((state) => state.orders?.orders || []);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Header />

      <Container className="mt-4">
        <h2 className="mb-4">My Profile</h2>

        {/* USER INFO */}
        <Card className="p-3 mb-4 shadow-sm">
          <h4>Welcome, {user.name} </h4>
          <p>Email: {user.email || "Not Available"}</p>
        </Card>

        {/* DASHBOARD CARDS */}
        <Row>
          {/* CART */}
          <Col md={4}>
            <Card className="p-3 text-center shadow-sm">
              <h5>Cart</h5>
              <h3>{cartItems.length}</h3>
              <Button onClick={() => router.push("/cart")}>
                View Cart
              </Button>
            </Card>
          </Col>

          {/* WISHLIST */}
          <Col md={4}>
            <Card className="p-3 text-center shadow-sm">
              <h5>Wishlist</h5>
              <h3>{wishlistItems.length}</h3>
              <Button variant="danger" onClick={() => router.push("/wishlist")}>
                View Wishlist
              </Button>
            </Card>
          </Col>

          {/* ORDERS */}
          <Col md={4}>
            <Card className="p-3 text-center shadow-sm">
              <h5>Orders</h5>
              <h3>{orders.length}</h3>
              <Button variant="success" onClick={() => router.push("/orders")}>
                View Orders
              </Button>
            </Card>
          </Col>
        </Row>

        {/* RECENT ACTIVITY */}
        <Card className="p-3 mt-4 shadow-sm">
          <h5>Recent Activity</h5>

          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.slice(0, 3).map((order, index) => (
              <div key={index}>
                <p>
                  Order #{order.id} - ${order.total}
                </p>
              </div>
            ))
          )}
        </Card>
      </Container>

      <Footer />
    </>
  );
}