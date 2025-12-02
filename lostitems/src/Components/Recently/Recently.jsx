console.log("THIS IS THE NEW RECENTLY FILE");

import React, { useEffect, useState } from "react";
import "./Recently.css";
import { API_BASE } from "../../api";
import { Link } from "react-router-dom";

const Recently = () => {
  const [recent, setRecent] = useState([]);

  // Fetch the latest 3 items from backend
  const fetchRecent = async () => {
    try {
      const res = await fetch(`${API_BASE}/items/`);
      const data = await res.json();

      if (res.ok) {
        const sorted = data.sort((a, b) => b.id - a.id); // newest first
        setRecent(sorted.slice(0, 3)); // take top 3
      } else {
        setRecent([]);
      }
    } catch (error) {
      console.error("Error fetching recent items", error);
    }
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  return (
    <div className="recently-section">
      <div className="recently-header">
        <div>
          <h2>Recently Posted</h2>
          <p>See the latest lost & found items from campus.</p>
        </div>

        <Link to="/items">
          <button className="recent-btn">View All</button>
        </Link>
      </div>

      <div className="recent-grid">
        {recent.length > 0 ? (
          recent.map((item) => (
            <div className="recent-card" key={item.id}>
              <img
                src={item.image_url || "/default.jpg"}
                alt={item.name}
                className="recent-img"
              />

              <div className="recent-info">
                <h3>{item.name}</h3>
                <p className="recent-category">{item.category}</p>
                <p className="recent-date">{item.date}</p>

                <Link to="/items">
                  <button className="details-btn">Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-recent">No items found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Recently;
