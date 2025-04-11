import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({cart, setCart,handleChange}) => {
  const [price ,setPrice]=useState(0);

  useEffect(()=>{
    localStorage.setItem('theCart',JSON.stringify(cart));
  },[cart]);

  //cart total price
  const handlePrice=()=>{
    let ans =0;
    cart.map((product)=>{
      ans+= product.price * product.amount
    })
    setPrice(ans);
  }

  //cart remove items
  const handleRemove=(id)=>{
    const arr= cart.filter((product)=> product._id !== id)
    setCart(arr);
  }
  
  //to send data to the order data
  const placeOrder = async () => {
     try {
    const cartData = JSON.parse(localStorage.getItem('theCart'));
    if (!cartData || !Array.isArray(cartData)) {
      console.error('Invalid cart data:', cartData);
      return;
    }

    const orderData = cartData.map(product => ({
      productID: product._id,
      orderName: product.productName,
      totalPrice: product.price * product.amount,
      amount: product.amount
    }));

    console.log('Order data:', orderData);

    const response = await axios.post('http://localhost:8070/order/add', orderData);
    console.log('Order response:', response.data);

    toast.success('Order placed successfully');
  } catch (error) {
    console.error('Error placing order:', error);
    toast.error('Failed to place order');
  }
};
  useEffect(()=>{
    handlePrice();
  })


  const handleConfirmPayment = async () => {
    try {
      await axios.put('http://localhost:8070/product/decrementProductQ', { cart });
      console.log('Product quantities decremented successfully');

      setCart([]);
      console.log('Cart cleared successfully');
 placeOrder();

    } catch (error) {
      console.error('Error confirming payment:', error.message);
    }
   
  };
  const confirmPayment = async () => {
    const cartData = JSON.parse(localStorage.getItem('theCart'));
  
    const cart = Object.values(cartData).map(item => {
      if (!item._id) {
        console.error('Invalid cart item data:', item);
        return null; // Return null for invalid items
      }
  
      return { _id: item._id, amount: item.quantity };
    }).filter(Boolean); // Remove null values from the array
  
    if (cart.length === 0) {
      console.error('Invalid cart data:', cart);
      return;
    }
  
    for (const item of cart) {
      const productId = item._id;
      const amount = item.amount;
  
      if (typeof productId !== 'string' || typeof amount !== 'number' || amount <= 0) {
        console.error('Invalid cart item data:', item);
        return;
      }
    }
    checkProductQuantity(cart);
;
  };
    const checkProductQuantity = async () => {
      for (const item of cart) {
        const productId = item._id;
        const amount = item.amount;
  
        const product = await axios.get(`http://localhost:8070/product/get/${productId}`);
  
        if (product.quantity < amount) {
           toast.info(`Insufficient quantity for product: ${product.productName}`, {
          });
          return;
        }
    }
    handleConfirmPayment(cart);
  };



  return (
    
    <div className='px-4 my-12'>
  <h2 className='mb-8 text-3xl font-bold text-white '> heelooo mata methana ida onne </h2>
  {/* Table for product detailing */}
  <div className="overflow-x-auto">
    <Table className='lg:w-[1180px] mx-auto'>
      <Table.Head>
        <Table.HeadCell>Product name</Table.HeadCell>
        <Table.HeadCell>Image</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Amount</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {
          cart?.map(product =>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={product._id}>
              <Table.Cell>{product.productName}</Table.Cell>
              <Table.Cell> <img src={product.imageUrl} alt={product.productName} width="50" height="50" /></Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-row mt-2">
                  <button className="px-5 py-2 font-bold" onClick={() => handleChange(product, +1)}>+</button>
                  <span className="px-5 py-2 font-bold">{product.amount}</span>
                  <button className="px-5 py-2 font-bold" onClick={() => handleChange(product, -1)}>-</button>
                </div>
              </Table.Cell>
              <Table.Cell>
                <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-3xl hover:bg-sky-600' onClick={() => handleRemove(product._id)}>Remove</button>
              </Table.Cell>
            </Table.Row>
          )
        }  </Table.Body>
    </Table>
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan="5" className="text-left"> {/* Updated from text-right to text-left */}
              <span className="font-bold text-sky-500 mr-5">Total price:</span>
              <span className="font-bold text-darkgreen text-2xl"> Rs {price}</span>
          </Table.Cell>
        </Table.Row>
        </Table.Body>
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
    </Table>
    <Link to="/choose_payment_method">
      <button className="mb-10 mt-10 mr-20 float-right bg-blue-500 text-white py-2 px-4 rounded"  onClick={confirmPayment}>Are you sure?</button>
    </Link>
      <button className="mb-10 mt-10 mr-20 float-right bg-blue-500 text-white py-2 px-4 rounded">Confirm payment</button>


  </div>
</div>

  )
}

export default Cart