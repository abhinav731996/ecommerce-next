// "use client";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../../redux/slices/authSlice";
// import { useRouter } from "next/navigation";
// import { Form, Button, Container } from "react-bootstrap";
// import Link from "next/link";

// export default function Login() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { user } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(login(form));

//     // wait thoda (redux update ke liye)
//     setTimeout(() => {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (
//         storedUser &&
//         storedUser.email === form.email &&
//         storedUser.password === form.password
//       ) {
//         router.push("/");
//       }
//     }, 200);
//   };

//   return (
//     <Container className="mt-4">
//       <h3>Sign In</h3>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-2">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Form.Group className="mb-2">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />
//         </Form.Group>

//         <Button type="submit">Login</Button>
//       </Form>

//       <hr />
//       Create a new account?
//       <br />
//       <Button as={Link} href="/auth/register">
//         Sign-up
//       </Button>
//     </Container>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import { mockApi } from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  // Fetch users from API
  const getUsers = async () => {
    const response = await mockApi.get("/users");
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const users = await getUsers();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("login", true);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login Successful");

        router.push("/");
      } else {
        toast.error("Invalid Email or Password ");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4">
          <h3 className="text-center mb-3">Login</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" required />
            </Form.Group>

            <Button type="submit">Login</Button>
          </Form>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link href="/auth/register">Register</Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}