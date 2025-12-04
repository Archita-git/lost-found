/*import React, { useEffect, useState } from "react";
import "../pages/items.css";
import { API_BASE } from "../api";

const Items = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items/`);
      const data = await res.json();
      if (res.ok) setItems(data);
      else alert(data.detail || "Failed to fetch items");
    } catch (error) {
      console.log(error);
      alert("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    const confirmDel = window.confirm("Delete this item?");
    if (!confirmDel) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    try {
      const res = await fetch(`${API_BASE}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Item deleted");
        fetchItems();
      } else {
        const data = await res.json();
        alert(data.detail);
      }
    } catch {
      alert("Delete failed");
    }
  };

  const filteredItems =
    filter === "All" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="items-page">
      <h1>Lost & Found Items</h1>

      <div className="items-filters">
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

      <div className="items-grid-new">
        {filteredItems.map((item) => (
          <div className="items-card" key={item.id}>
            <img
              src={item.image_url || "/default.jpg"}
              alt={item.name}
              className="items-img"
            />

            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Date:</strong> {item.date}</p>

            <button className="items-delete" onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
*/
import React, { useEffect, useState } from "react";
import "../pages/items.css";
import { API_BASE } from "../api";
import { useLocation } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items/`);
      const data = await res.json();
      if (res.ok) setItems(data);
      else alert(data.detail || "Failed to fetch items");
    } catch (error) {
      console.log(error);
      alert("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    const confirmDel = window.confirm("Delete this item?");
    if (!confirmDel) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    try {
      const res = await fetch(`${API_BASE}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Item deleted");
        fetchItems();
      } else {
        const data = await res.json();
        alert(data.detail);
      }
    } catch {
      alert("Delete failed");
    }
  };

  // 🔥 Category filter FIRST, then status filters
  const categoryFiltered = selectedCategory
    ? items.filter(
        (i) => i.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : items;

  const filteredItems =
    filter === "All"
      ? categoryFiltered
      : categoryFiltered.filter((i) => i.status === filter);

  return (
    <div className="items-page">
      <h1>
        {selectedCategory ? `${selectedCategory} Items` : "Lost & Found Items"}
      </h1>

      <div className="items-filters">
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

      <div className="items-grid-new">
        {filteredItems.map((item) => (
          <div className="items-card" key={item.id}>
            <img
              src={item.image_url || "/default.jpg"}
              alt={item.name}
              className="items-img"
            />

            <h3>{item.name}</h3>
            {/*<p><strong>Category:</strong> {item.category}</p>*/}
            <p><strong>Location:</strong> {item.location}</p>
            {/*<p><strong>Status:</strong> {item.status}</p>*/}
            <p><strong>Contact:</strong> {item.contact}</p>
            {/*<p><strong>Email:</strong> {item.email}</p>*/}
            <p><strong>Date:</strong> {item.date}</p>

            <button className="items-delete" onClick={() => deleteItem(item.id)}>
              Resolve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
