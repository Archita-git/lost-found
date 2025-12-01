import React from 'react'
import './Stat.css'
import crowd from '../../assets/crowd.png'
import location from '../../assets/location.png'
import tick from '../../assets/tick.png'


const Stat = () => {
  return (
    <>
    <div className="statbox">
        <div className="box1">
            <div className="imgdiv">
            <img src={crowd} height="60px" alt=""/>
            </div>
            <p>2864</p><p>ACTIVE STUDENTS</p>
        </div>
        <div className="box2">
            <div className="imgdiv">
            <img src={tick} height="60px" alt=""/>
            </div>
            <p>1542</p><p>ITEMS RETURNED</p>
        
        </div>
        <div className="box3">
            <div className="imgdiv">
            <img src={location} height="60px" alt=""/>
            </div>
            <p>10</p><p>CAMPUS LOCATION</p>
        </div>
    </div>
    </>
  )
}

export default Stat