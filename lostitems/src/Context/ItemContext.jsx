import React,{ createContext, useState,useEffect } from "react";
import Category from "../Pages/Category";
export const ItemContext=createContext(null);//lets component access without passing props

export const ItemContextProvider=(props)=>{//wraps entire app ..everything inside can read/write items
    const defcat=[
        {category:"Laptop",items:[]},
        {category:"Phone",items:[]},
        {category:"Electronics",items:[]},
        {category:"Wallet",items:[]},
        {category:"Valuables",items:[]},
        {category:"Others",items:[]}
    ];

 const [itemcon, setItemcon] = useState(() => {//holds all cat and items
  const saved = localStorage.getItem("itemcon");

  if (saved) {
    const parseddone = JSON.parse(saved); //convert string to js array
    
    // If localStorage has data AND it’s not empty → use it
    if (Array.isArray(parseddone) && parseddone.length > 0) {
      return parseddone;
    }
  }
  // Otherwise  load default predefined categories
  return defcat;
});


    useEffect(() => {
    localStorage.setItem("itemcon", JSON.stringify(itemcon));
  }, [itemcon]);

    const handleadd=(newitem)=>{
        setItemcon((prev)=>
        prev.map((cat)=>
        cat.category.toLowerCase()===newitem.category.toLowerCase()?
    {...cat,items:[...cat.items,newitem]}:cat));
    };
    const contextValue={itemcon,handleadd};

    //now hero recently add etctetc can use this through below one
    return(
        <ItemContext.Provider value={contextValue}>
            {props.children}
        </ItemContext.Provider>
    )
}
export default ItemContextProvider;

