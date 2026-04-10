// "use client";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../../../redux/slices/authSlice";
// import { useRouter } from "next/navigation";
// import { Form, Button, Container } from "react-bootstrap";
// import Link from "next/link";

// export default function Register() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(register(form));
//     alert("Registered Successfully");
//     router.push("/auth/login");
//   };

//   return (
//     <Container className="mt-4">
//       <h3>Sign Up</h3>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-2">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />
//         </Form.Group>

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

//         <Button type="submit">Register</Button>
//       </Form>
//       <hr/>
//       Back to login page:-
//       <br/>
//         <Button type="submit" as={Link} href="/auth/login">Login</Button>
//     </Container>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mockApi } from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // API Call
  const registerUser = async (data) => {
    return await mockApi.post("/users", data);
  };

  // Submit Handler
  const handleOnSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await registerUser(data);

      toast.success("User Created Successfully ");

      reset();

      router.push("/auth/login");

      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4">
          <h3 className="text-center mb-3">Register</h3>

          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control {...register("name")} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email")} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password")} required />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}