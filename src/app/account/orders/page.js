import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Orders() {
  return (
    <>
    <Header/>
    <div className="container mt-4">
      <h3>Order History</h3>

      <div className="card p-3">
        <p>Order #12345</p>
        <p>Status: Delivered</p>
        <p>Total: $1200</p>
      </div>
    </div>
    <Footer/>
    </>
  );
}