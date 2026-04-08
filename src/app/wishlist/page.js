"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { Button } from "react-bootstrap";
import { addToCart } from "@/redux/slices/cartSlice";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Wishlist() {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <>
    <Header/>
    <div className="container mt-4">
      <h3>Wishlists</h3>

      {wishlistItems.length === 0 ? (
        <h5 className="text-center mt-5">Your wishlist is empty </h5>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card p-3 h-100 text-center">
                
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="img-fluid mb-2"
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <h6>{item.title}</h6>
                <p className="fw-bold">${item.price}</p>

                <Button
                  variant="danger"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  Remove
                </Button>
                <br/>
                <Button
                  variant="primary"
                  onClick={() => {dispatch(addToCart(item));
                     dispatch(removeFromWishlist(item.id))}}
                >
                  Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}