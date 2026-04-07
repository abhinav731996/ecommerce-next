"use client";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { Cart, Heart, Shop } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
//   const [user, setUser] = useState(null);

// useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   setUser(storedUser);
// }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const [search, setSearch] = useState("");

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${search}`);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" style={{height:'80px'}} expand="lg" sticky="top">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} href="/">
          <Shop/> Shopify
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* SEARCH BAR */}
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          {/* RIGHT MENU */}
          <Nav className="ms-auto align-items-center">

            {/* WISHLIST */}
            <Nav.Link as={Link} href="/wishlist" className="position-relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {wishlistItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* CART */}
            <Nav.Link as={Link} href="/cart" className="position-relative">
              <Cart size={20} />
              {cartItems.length > 0 && (
                <Badge bg="success" className="position-absolute top-0 start-100 translate-middle">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* USER */}
            {user ? (
              <NavDropdown title={` ${user.name}`} align="end">
                <NavDropdown.Item as={Link} href="/account">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} href="/account/orders">
                  Orders
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(logout());
                    router.push("/auth/login");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} href="/auth/login">
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} href="/auth/register">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;