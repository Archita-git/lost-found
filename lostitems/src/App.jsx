import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Add from './Pages/Add';
import ContactUs from './Pages/ContactUs';
import About from './Pages/About';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';

import Items from './Pages/Items';   // ⭐ ADD THIS
import { ItemContextProvider } from "./Context/ItemContext";

function App() {
  return (
    <ItemContextProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/items" element={<Items />} />     {/* ⭐ ADD THIS ROUTE */}
          <Route path="/add" element={<Add />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </ItemContextProvider>
  );
}

export default App;
