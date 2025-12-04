import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import {motion} from "framer-motion";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

   // AUTO-CLOSE drawer when clicking an item
  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setIsOpen(false);
  };

  
  // AUTO-CLOSE when route changes (even via navigation)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ---------------- ACTIVE PAGE HIGHLIGHT ----------------
  useEffect(() => {
    if (location.state?.activeMenu) {
      setMenu(location.state.activeMenu);
      return;
    }

    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/items") setMenu("items");   // ⭐ NEW
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");
  }, [location.pathname, location.state]);

  // ---------------- NAVBAR ANIMATIONS ----------------
  useEffect(() => {
    const nav = navRef.current;
    const items = nav.querySelectorAll(".nav-menu li");

    gsap.from(nav, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(items, {
      opacity: 0,
      y: -20,
      stagger: 0.15,
      delay: 0.4,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      
      {/* ---------------- LOGO ---------------- */}
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>

      {/* ---------------- HAMBURGER ---------------- */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* ---------------- MENU ITEMS ---------------- */}
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>

        {/* HOME */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() =>  handleMenuClick("home")}>
          <Link to="/">HOME</Link>
          {menu === "home" && <hr />}
        </motion.li>

        {/* CATEGORY */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => handleMenuClick("category")}>
          <Link to="/category">CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

        {/* ⭐ ITEMS (NEW PAGE) */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => handleMenuClick("items")}>
          <Link to="/items">ITEMS</Link>
          {menu === "items" && <hr />}
        </motion.li>

        {/* ADD */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => handleMenuClick("add")}>
          <Link to="/add">ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        {/* CONTACT */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => handleMenuClick("contact-us")}>
          <Link to="/contact-us">CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        {/* ABOUT */}
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => handleMenuClick("about")}>
          <Link to="/about">ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>

        {/* MOBILE SIGNUP BUTTON */}
        <li className="mobile-login">
          <Link to="/loginsignup">
            <button className="login">SIGN UP</button>
          </Link>
        </li>
      </ul>

      {/* DESKTOP SIGNUP BUTTON */}
      <div className="nav-loginbox">
        <Link to="/loginsignup">
          <button className="login">SIGN UP</button>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
