"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API } from "../../../services/api";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist } from "@/redux/slices/wishlistSlice";
import { Check } from "react-bootstrap-icons";

const ProductDetails = () => {
    const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

    const cartState = useSelector((state)=> state.cart);
  const wishlistState = useSelector((state)=> state.wishlist);

  const [product, setProduct] = useState(null);

  const id = params?.id;

useEffect(() => {
  if (!id) return;

  const getProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  getProduct();
}, [id]);

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }
// console.log("ID:", id);

  // for add to cart & wishlist button


  

  const inCart = cartState?.cartItems?.some((item) => item.id === product.id);
  const inWishlist = wishlistState?.wishlistItems?.some((item) => item.id === product.id);

  // add to cart
  const handleAddToCart = () => {
    if (inCart) {
      toast.warning("Already in cart !!")
    }else{
      dispatch(addToCart(product));
      toast.success("Added to cart ")
    }
  }

  // add to wishlist
  const handleAddToWishlist = () => {
    if (inWishlist) {
      toast.warning("Already in wishlist !!")
    }else{
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist ")
    }
  }


  return (
    <>
    <Header/>
    <Container className="mt-4">
      
      <Button variant="secondary" onClick={() => router.back()}>
        ← Back
      </Button>

      <Row className="mt-3">
        <Col md={6}>
          <img src={product.thumbnail} className="img-fluid" />
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <hr/>
          <h4>${product.price}</h4>
          <hr/>
          <p>{product.description}</p>
          <hr/>

          <Button variant="success" onClick={handleAddToCart}>
            {inCart ? (
              <>
              Cart <Check/>
              </>
            ):(
            'Add to Cart')}
            </Button>
          {" "}
          <Button variant="danger" onClick={handleAddToWishlist}>
            { inWishlist ? (
              <>
              Wishlist <Check/>
              </>
            ):(
            "Add to Wishlist")}
            </Button>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default ProductDetails;