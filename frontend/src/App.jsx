
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'
import Cart from './shop/Cart'
import { useState } from 'react'
import BestProducts from './home/BestProducts'


function App() {

  const [show,setShow]=useState(true);
  const [cart,setCart]=useState([]);
  const handleClick = (product) => {
    // console.log(product);
    let isPresent =false;

    cart.forEach((item)=>{
      if(product._id === item._id)
        isPresent=true;
    })
    if(isPresent)
        return;
      setCart ([...cart, product]);
    } 

  return (
    <>
  
    <div className='min-h-screen'> 
    
   
    <Outlet/>
    </div>
  
     <MyFooter/>
    </>
  )
}

export default App
