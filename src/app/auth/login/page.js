"use client";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ name: "User" }));
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}