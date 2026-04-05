"use client";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart.cartItems);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">Shop</Navbar.Brand>

        <Nav>
          <Nav.Link as={Link} href="/shop">Shop</Nav.Link>

          <Nav.Link as={Link} href="/cart">
            Cart <Badge>{cart.length}</Badge>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;