"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Shop() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(
    (state) => state.products
  );

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // FETCH FROM REDUX
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // RESET PAGE
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category, sort]);

  // FILTER
  let filteredProducts = products;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  // PAGINATION
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Header />

      <div className="container mt-4">
        <h3>Shop</h3>

        {/* FILTER */}
        <div className="d-flex gap-3 mb-3">
          <select
            className="form-select w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

          <select
            className="form-select w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <h5>Loading...</h5>
        ) : (
          <>
            {/* PRODUCTS */}
            <div className="row">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <div className="col-md-3 mb-4" key={p.id}>
                    <ProductCard product={p} />
                  </div>
                ))
              ) : (
                <h5>No products found</h5>
              )}
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                className="btn btn-dark"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span className="align-self-center">Page {page}</span>

              <button
                className="btn btn-dark"
                disabled={page * itemsPerPage >= sortedProducts.length}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}