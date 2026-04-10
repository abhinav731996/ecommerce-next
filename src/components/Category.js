import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";

const Category = () => {
  const router = useRouter();

  const categories = ["smartphones", "laptops", "fragrances", "groceries"];
  return (
    
    <div className="d-flex justify-content-evenly">
      {categories.map((cat) => (
        <Button
          key={cat}
          className="m-2"
          onClick={() => router.push(`/category/${cat}`)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default Category;
