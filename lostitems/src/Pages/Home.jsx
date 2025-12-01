import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  // ---------------- FETCH ITEMS FROM BACKEND ----------------
  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items/`);
      const data = await res.json();

      if (res.ok) {
        setItems(data);
      } else {
        alert(data.detail || "Failed to fetch items");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ---------------- FILTER ITEMS ----------------
  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.status === filter);

  return (
    <div className="home-page">
      <h1>Lost & Found Items</h1>

      {/* FILTER BUTTONS */}
      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          className={filter === "Lost" ? "active" : ""}
          onClick={() => setFilter("Lost")}
        >
          Lost
        </button>

        <button
          className={filter === "Found" ? "active" : ""}
          onClick={() => setFilter("Found")}
        >
          Found
        </button>
      </div>

      {/* ITEMS LIST */}
      <div className="items-grid">
        {filteredItems.map((item) => (
          <div className="item-card" key={item.id}>
            <img
              src={item.image_url || "/default.jpg"} // backend field ✔️
              alt={item.name}
              className="item-image"
            />

            <h3>{item.name}</h3>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Contact:</strong> {item.contact}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
