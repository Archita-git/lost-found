import React, { useContext } from "react";
import "./Category.css";
import { ItemContext } from "../Context/ItemContext";
import { Link } from "react-router-dom";

const Category = () => {
  const { itemcon } = useContext(ItemContext);

  return (
    <div className="category-page">
      <h1>Select a Category</h1>

      <div className="category-grid">
        {itemcon.map((cat) => (
          <div className="category-card" key={cat.category}>
            <img src={cat.image} alt={cat.category} />

            <h3>{cat.category}</h3>

            <Link to="/items">
              <button className="category-btn">View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
