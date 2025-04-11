
import {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Allproducts from "./Allproducts";
import Cart from "./Cart";

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const cartFromLocalStorage = JSON.parse(localStorage.getItem('theCart')) || {};


const Shop = () =>{
  const [show,setShow] = useState(true);
    const [cart,setCart]=useState(cartFromLocalStorage);
    const [warning,setWarning] = useState(false);
  
   //add to cart
    const handleClick = (product) => {
      // console.log(product);
      let isPresent =false;
  
      cart.forEach((item)=>{
        if(product._id === item._id)
          isPresent=true;
      })
      if(isPresent){
        setWarning(true);
        setTimeout(()=>{
          toast.info('Item Already Added!');
          setWarning(false);
        });
        return; 
      }

        setCart ([...cart, product]);
      }

// const handleChange=(product,d)=>{
//   console.log(product,d);
// }

//cart quantity handling
const handleChange=(product,d)=>{
  let ind =-1;
 
  cart.forEach((data, index)=>{
     if(data._id ===product._id){
       ind =index;
     }
      
  });
     const tempArr = cart;
     tempArr[ind].amount += d;
     
     if (tempArr[ind].amount === 0)
       tempArr[ind].amount = 1;
     setCart([...tempArr])
 }

    return (
        <> 
         
        <Navbar size={cart.length} setShow={setShow}/>

        {
             show ? <Allproducts handleClick={handleClick}/>: <Cart cart={cart} setCart={setCart} handleChange={handleChange}/>
        }
        
         {
          warning && <></>
          
        }
 <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"         
          />     

        
        </>  
    )
}
export default Shop