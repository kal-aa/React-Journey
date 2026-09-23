import axios from "axios";
import Header from "../../components/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";
// import { products } from "../../starting-code/data/products";

export default function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetch("http://localhost:3000/api/products");
  //     const data = await response.json();
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // });

  useEffect(() => {
    const getHomeData = async () => {
      const url = search
        ? `/api/products?search=${encodeURIComponent(search)}`
        : "/api/products";

      const response = await axios.get(url);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

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
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
