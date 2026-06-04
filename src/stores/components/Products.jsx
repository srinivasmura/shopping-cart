import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useCart } from "../components/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // NEW

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center", color: "red" }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  const categoryFiltered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  const filteredProducts = searchText === ""
    ? categoryFiltered
    : categoryFiltered.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <div className="search-content">
        <SearchBar onCategoryChange={setCategory} onSearchChange={setSearchText} />
      </div>

      <div className="products container">
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", color: "red", width: "100%" }}>No products found!</p>
        )}

        {filteredProducts.map(item => {
          const inCart = cartItems.find(c => c.id === item.id);
          return (
            <div key={item.id} className="product-card">

              {/* clicking image opens popup */}
              <img
                src={item.image}
                alt={item.title}
                width="120"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedProduct(item)}
              />

              <h3 className="pro-title">{item.title}</h3>
              <div className="price-section flex-box">
                <div className="price"><p>$ {item.price}</p></div>
                <div className="rating"><p>Rating: {item.rating.rate}</p></div>
              </div>
              <p className="description-section">{item.description}</p>

              <button
                className="cartbtn"
                onClick={() => addToCart(item)}
                style={{
                  transition: "background 0.2s",
                  background: inCart ? "#10B981" : undefined,
                  color: inCart ? "#fff" : undefined,
                }}
              >
                {inCart ? `✓ In Cart (${inCart.qty})` : "ADD TO CART"}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── POPUP MODAL ── */}
      {selectedProduct && (() => {
        const inCart = cartItems.find(c => c.id === selectedProduct.id);
        return (
          <div className="popup-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="popup-modal" onClick={e => e.stopPropagation()}>

              <button
                className="popup-close"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>

              <div className="popup-img-wrap">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              <span className="popup-badge">{selectedProduct.category}</span>
              <h2 className="popup-title">{selectedProduct.title}</h2>
              <p className="popup-desc">{selectedProduct.description}</p>

              <div className="popup-meta">
                <span className="popup-price">$ {selectedProduct.price}</span>
                <span className="popup-rating">
                  ⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
                </span>
              </div>

              <button
                className="cartbtn"
                onClick={() => addToCart(selectedProduct)}
                style={{
                  transition: "background 0.2s",
                  background: inCart ? "#10B981" : undefined,
                  color: inCart ? "#fff" : undefined,
                  width: "100%",
                }}
              >
                {inCart ? `✓ In Cart (${inCart.qty})` : "ADD TO CART"}
              </button>

            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default Products;