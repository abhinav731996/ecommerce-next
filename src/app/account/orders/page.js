"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockApi } from "@/services/api";
import { Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Orders() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await mockApi.get(`/orders?userId=${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h3>Order History</h3>

        {orders.length === 0 ? (
          <h5>No orders found</h5>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="p-3 mb-3 shadow-sm">
              <h5>Order #{order.id}</h5>

              <p>Status: {order.status}</p>
              <p>Payment: {order.paymentMode}</p>
              <p>Total: ${order.total}</p>

              <hr />

              <h6>Items:</h6>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between"
                >
                  <span>{item.title}</span>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>
              ))}
            </Card>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}