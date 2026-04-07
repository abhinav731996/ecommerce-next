"use client";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "next/navigation";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    API.get("/products").then((res) =>
      setProducts(res.data.products)
    );
  }, []);

  //  SEARCH FILTER
  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  //  CATEGORY FILTER
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  //  SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  //  PAGINATION
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h3>Shop</h3>

      {/* FILTER BAR */}
      <div className="d-flex gap-3 mb-3">

        {/* SORT */}
        <select
          className="form-select w-auto"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        {/* CATEGORY */}
        <select
          className="form-select w-auto"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
        </select>
      </div>

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
    </div>
  );
}