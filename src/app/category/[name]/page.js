"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { API } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist } from "@/redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import { Check2 } from "react-bootstrap-icons";
import Link from "next/link";

export default function CategoryPage() {
  const { name } = useParams();

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || [],
  );

  useEffect(() => {
    if (!name) return;

    const fetchProducts = async () => {
      try {
        const res = await API.get(`/products/category/${name}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [name]);

  return (
    <>
      <Header />

      <Container className="mt-4">
        <h3 className="mb-4 text-capitalize">{name} Products</h3>

        <Row>
          {products.length === 0 ? (
            <h5 className="text-center">No products found</h5>
          ) : (
            products.map((item) => {
              const inCart = cartItems.some(
                (cartItem) => cartItem.id === item.id,
              );

              const inWishlist = wishlistItems.some(
                (wishItem) => wishItem.id === item.id,
              );

              return (
                <Col md={3} key={item.id} className="mb-4">
                  <Card className="p-2 h-100 text-center shadow-sm">
                    {/* IMAGE CLICK */}
                    <Link href={item?.id ? `/product/${item.id}` : "#"}>
                      <Card.Img src={item.thumbnail} />
                    </Link>

                    {/* <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid"
                      style={{ height: "300px", objectFit: "cover" }}
                    /> */}

                    <h5 className="mt-2">{item.title}</h5>
                    <p>${item.price}</p>

                    <div className="d-flex justify-content-between">
                      {/* CART */}
                      <Button
                        variant={inCart ? "secondary" : "primary"}
                        onClick={() => {
                          if (inCart) {
                            toast.warning("Already in cart !!");
                          } else {
                            dispatch(addToCart(item));
                            toast.success("Added to cart");
                          }
                        }}
                      >
                        {inCart ? (
                          <>
                            Added <Check2 />
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </Button>

                      {/* WISHLIST */}
                      <Button
                        variant={inWishlist ? "secondary" : "outline-danger"}
                        onClick={() => {
                          if (inWishlist) {
                            toast.warning("Already in wishlist");
                          } else {
                            dispatch(addToWishlist(item));
                            toast.success("Added to wishlist");
                          }
                        }}
                      >
                        {inWishlist ? (
                          <>
                            Saved <Check2 />
                          </>
                        ) : (
                          "Wishlist"
                        )}
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>

      <Footer />
    </>
  );
}
