import React, { useEffect, useState } from "react";
import axios from "axios";
import AllProductCard from "../components/AllProductCard";
import Banner from "../components/ProBanner";

const Allproducts = ({handleClick}) => {

    const [product,setProduct]=useState([]);
  
    useEffect(()=>{
        axios.get("http://localhost:8070/product/").then((res)=>{
          setProduct(res.data)
        }).catch((err)=>{
          alert(err.message)
        })
      
    },[])
  return (
   <div>
    <Banner/> 

    <AllProductCard product={product}  headline="Let's Shop"  handleClick={handleClick} key={product._id} /> 
    
   </div>

  )
}

export default Allproducts