import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./css/wardrobe.css";

export default function Wardrobe() {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Top");

  const categories = ["Top", "Bottom", "Shoes", "Accessory"];

  // GET ITEMS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/wardrobe",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setWardrobeItems(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch wardrobe");
      }
    };

    fetchItems();
  }, []);

  // DELETE
  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/wardrobe/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWardrobeItems(
        wardrobeItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Delete failed");
    }
  };

  const filteredItems = wardrobeItems.filter(
    (item) => item.type === activeCategory
  );

  return (
    <Layout>
      <div className="wardrobe-container">
        <h1 className="wardrobe-title">Your Wardrobe</h1>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredItems.length === 0 ? (
            <p className="empty-state">
              No items added in {activeCategory}.
            </p>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="wardrobe-card">
                <img src={item.imageUrl} alt="item" />
                <div className="card-info">
                  <p>{item.color}</p>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}