import React, { useState, useContext } from "react";
import "./CategoryItem.css";
import { ItemContext } from "../Context/ItemContext";

const CategoryItems = ({ category, goBack }) => {
  const { itemcon } = useContext(ItemContext);

  // ✅ Find the selected category’s items
  const selectedCat = itemcon.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const [statusFilter, setStatusFilter] = useState("All");
  const [itemStatuses, setItemStatuses] = useState(() => {
    const allItems = selectedCat?.items || [];
    return allItems.reduce((acc, item) => {
      acc[item.id] = item.status || "Lost";
      return acc;
    }, {});
  });

  // ✅ Filter items by status
// ✅ Sort: newest first, then filter by status
const filteredItems = (selectedCat?.items || [])
  .sort((a, b) => b.id - a.id) // ✅ Newest items show first
  .filter(
    (item) =>
      statusFilter === "All" || itemStatuses[item.id] === statusFilter
  );


  // ✅ Handle status change (Lost → Found → Resolved)
  const handleStatusChange = (id) => {
    setItemStatuses((prev) => {
      const current = prev[id];
      let nextStatus =
        current === "Lost"
          ? "Found"
          : current === "Found"
          ? "Resolved"
          : "Resolved";
      return { ...prev, [id]: nextStatus };
    });
  };

  return (
    <div className="category-items-page">
      <button className="back-btn" onClick={goBack}>
        ← Back to Categories
      </button>

      <h2 className="cat-items-title">{category}</h2>
      <p className="cat-items-count">
        {filteredItems.length} items in this category
      </p>

      {/* ✅ Filter dropdown */}
      <div className="filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Items</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="category-items-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((p) => {
            const currentStatus = itemStatuses[p.id];
            const isDisabled = currentStatus === "Resolved";

            return (
              <div
                className={`item-row ${isDisabled ? "disabled" : ""}`}
                key={p.id}
              >
                <div className="item-header">
                  <span className={`status-tag ${currentStatus.toLowerCase()}`}>
                    {currentStatus}
                  </span>
                  <button
                    className="mark-btn"
                    onClick={() => handleStatusChange(p.id)}
                    disabled={isDisabled}
                  >
                    {currentStatus === "Lost"
                      ? "Mark as Found"
                      : currentStatus === "Found"
                      ? "Mark as Resolved"
                      : "Resolved"}
                  </button>
                </div>

                <div className="item-body">
                  <img src={p.image} alt={p.name} />
                  <div className="item-details">
                    <h3>{p.name}</h3>
                    <p className="item-desc">
                      Found/lost at {p.location}.
                    </p>
                    <p className="item-location">{p.location}</p>
                    <p className="item-time">{p.date}</p>

                    <div className="contact-info">
                      <p>
                        <strong>Contact:</strong> {p.contact}
                      </p>
                      <p>
                        <strong>Email:</strong> {p.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-text">No items in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
