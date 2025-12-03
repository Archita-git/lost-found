/*import React, { useContext } from "react";
import "./Category.css";
import { ItemContext } from "../Context/ItemContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
*/
import React, { useContext } from "react";
import "./Category.css";
import { ItemContext } from "../Context/ItemContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Category = () => {
  const { itemcon } = useContext(ItemContext);

  return (
    <div className="category-page">
      <h1>Select a Category</h1>

      <div className="category-grid">
        {itemcon.map((cat, index) => (
          <motion.div
            className="category-card"
            key={cat.category}
            initial={{ 
              opacity: 0, 
              x: index % 2 === 0 ? -100 : 100  // even → left, odd → right
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.25 }} // 0.25 sec stagger
          >
            <img src={cat.image} alt={cat.category} />
            <h3>{cat.category}</h3>

            <Link to={`/items?category=${cat.category}`}>
              <button className="category-btn">View</button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;

