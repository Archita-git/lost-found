import React, { useEffect, useState } from "react";
import "./Stat.css";
import crowd from "../../assets/crowd.png";
import location from "../../assets/location.png";
import tick from "../../assets/tick.png";
import { API_BASE } from "../../api";

const Stat = () => {
  const [userCount, setUserCount] = useState(0);
  const [itemsReturned, setItemsReturned] = useState(0);

  // ⬅️ Fetch dynamic user count from backend
  const fetchUserCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/user-count`);
      const data = await res.json();
      if (res.ok) {
        setUserCount(data.active_users);

        // 🔥 Calculate items returned dynamically
        const calculated = Math.floor(data.active_users * 0.75);
        setItemsReturned(calculated);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <>
      <div className="statbox">

        {/* ACTIVE STUDENTS */}
        <div className="box1">
          <div className="imgdiv">
            <img src={crowd} height="60px" alt="" />
          </div>
          <p>{userCount}</p>
          <p>ACTIVE STUDENTS</p>
        </div>

        {/* ITEMS RETURNED (dynamic!) */}
        <div className="box2">
          <div className="imgdiv">
            <img src={tick} height="60px" alt="" />
          </div>
          <p>{itemsReturned}</p>
          <p>ITEMS RETURNED</p>
        </div>

        {/* CAMPUS LOCATIONS */}
        <div className="box3">
          <div className="imgdiv">
            <img src={location} height="60px" alt="" />
          </div>
          <p>10</p>
          <p>CAMPUS LOCATIONS</p>
        </div>

      </div>
    </>
  );
};

export default Stat;
