import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link,useLocation } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false); //hambuger state
  const navRef = useRef(null);

  const location=useLocation();

//route change upon clicking any btn with hr props that i have written
  useEffect(()=>{
    if(location.state?.activeMenu){
      setMenu(location.state.activeMenu);
      return;
    }

    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");

  }, [location.pathname, location.state]); //this dependency re reruns whenever path or state chnages


  // Entrance animation for navbar
  useEffect(() => {
    const nav = navRef.current; //gets dom elements from navbar
    const items = nav.querySelectorAll(".nav-menu li");

    gsap.from(nav, {
      y:-80,
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
    <div className="navbar" ref={navRef}> {/*to access gsap*/}


      {/* Logo Section */}
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>



      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}> {/*toggle*/ }
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>


      {/* Navigation Menu */}
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("home")}>
          <Link to="/">HOME</Link>
          {menu === "home" && <hr />} {/*underline if this is active item*/}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("category")}>
          <Link to="/category">CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("add")}>
          <Link to="/add">ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("contact-us")}>
          <Link to="/contact-us">CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("about")}>
          <Link to="/about">ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>




        {/* Signup Button visible in mobile menu */}
        <li className="mobile-login">
          <Link to="/loginsignup">
            <button className="login">SIGN UP</button>
          </Link>
        </li>
      </ul>

      {/* Signup Button visible in desktop */}
      <div className="nav-loginbox">
        <Link to="/loginsignup">
          <button className="login">SIGN UP</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
