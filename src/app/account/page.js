"use client";
import { useSelector } from "react-redux";

export default function Account() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      {user ? <p>{user.name}</p> : <p>Not Logged In</p>}
    </div>
  );
}