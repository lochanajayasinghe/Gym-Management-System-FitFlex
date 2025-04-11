import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = ({ }) => {
 
    const [order,setOrder]=useState([]);
  
    useEffect(()=>{
        axios.get("http://localhost:8070/order/").then((res)=>{
            setOrder(res.data)
        }).catch((err)=>{
          alert(err.message)
        })
    },[])
    
  return (
    <div className="ml-10 px-4 my-12" style={{ backgroundColor: '#e5f2ff' }}>
      <h2 className="ml-10 mb-8 text-3xl font-bold text-white">Order Details</h2>
      <div className="overflow-x-auto">
        <Table className="lg:w-[1180px] mx-auto">
          {/* Table headers */}
          <Table.Head>
            <Table.HeadCell>Order Id</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
          </Table.Head>
          {/* Table body */}
          <Table.Body className="divide-y">
            {
            order.map(order => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={order._id}>
                <Table.Cell>{order._id}</Table.Cell>
                <Table.Cell><img src={order.imageUrl} alt={order.productName} width="50" height="50" /></Table.Cell>
                 <Table.Cell>{order.orderName}</Table.Cell>
                 <Table.Cell>{order.amount}</Table.Cell>
                <Table.Cell>{order.totalPrice}</Table.Cell>
             
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Order;
