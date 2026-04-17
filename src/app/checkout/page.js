import { useDispatch } from "react-redux";
import { addOrder } from "@/redux/slices/orderSlice";
import { mockApi } from "@/services/api";

const dispatch = useDispatch();

const placeOrder = async () => {
  const newOrder = {
    userId: user.id,
    items: cartItems,
    total: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    date: new Date().toISOString(),
  };

  try {
    const res = await mockApi.post("/orders", newOrder);

    //  UPDATE REDUX
    dispatch(addOrder(res.data));

    //  CLEAR CART (optional)
    // dispatch(clearCart());

    alert("Order Placed Successfully");
  } catch (err) {
    console.error(err);
  }
};
