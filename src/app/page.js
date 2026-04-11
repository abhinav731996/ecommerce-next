// "use client";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import Header from "@/components/Header";
// import ProductCard from "@/components/ProductCard";

// export default function Home() {
//   const disptach = useDispatch();
//   const { items } = useSelector((state)=>state.products);
//   useEffect(()=>{
//     disptach(fetchProducts());
//   })
//   return (
//     // <div className={styles.page}>
//     //   <main className={styles.main}>
//     //     <Image
//     //       className={styles.logo}
//     //       src="/next.svg"
//     //       alt="Next.js logo"
//     //       width={100}
//     //       height={20}
//     //       priority
//     //     />
//     //     <div className={styles.intro}>
//     //       <h1>To get started, edit the page.js file.</h1>
//     //       <p>
//     //         Looking for a starting point or more instructions? Head over to{" "}
//     //         <a
//     //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //           target="_blank"
//     //           rel="noopener noreferrer"
//     //         >
//     //           Templates
//     //         </a>{" "}
//     //         or the{" "}
//     //         <a
//     //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //           target="_blank"
//     //           rel="noopener noreferrer"
//     //         >
//     //           Learning
//     //         </a>{" "}
//     //         center.
//     //       </p>
//     //     </div>
//     //     <div className={styles.ctas}>
//     //       <a
//     //         className={styles.primary}
//     //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         <Image
//     //           className={styles.logo}
//     //           src="/vercel.svg"
//     //           alt="Vercel logomark"
//     //           width={16}
//     //           height={16}
//     //         />
//     //         Deploy Now
//     //       </a>
//     //       <a
//     //         className={styles.secondary}
//     //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         Documentation
//     //       </a>
//     //     </div>
//     //   </main>
//     // </div>
//     <div>
//       <Header />
//       <div className="container mt-4">
//         <div className="row">
//           {items.map((product) => (
//             <div className="col-md-3" key={product.id}>
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productSlice";
// import ProductCard from "../components/ProductCard";
// import Header from "../components/Header";
// import Footer from "@/components/Footer";

// export default function Home() {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, []);

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="container mt-4">
//         <div className="row">
//           {items.map((product) => (
//             <div className="col-md-3" key={product.id}>
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <Footer/> */}
//     </>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { API } from "../services/api";
import ProductCard from "../components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Category from "@/components/Category";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagenatio";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);


  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);



  return (
    <>
    <Header/>
    <Pagination/>
    {/* <Category/> */}
    
    <div className="container mt-4">
      <div className="row">
        {products.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    
    </>
  );
}