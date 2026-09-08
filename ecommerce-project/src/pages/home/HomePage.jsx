import axios from "axios";
import Header from "../../components/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
// import { products } from "../../starting-code/data/products";

export default function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetch("http://localhost:3000/api/products");
  //     const data = await response.json();
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // });

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://supersimple.dev/images/home-favicon.png"
      />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
