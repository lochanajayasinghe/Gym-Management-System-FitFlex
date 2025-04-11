import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { Link, json } from 'react-router-dom';
import Allproducts from '../shop/Allproducts';
import axios from "axios"
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProduct = () => {
    const[allProducts,setAllProducts]= useState([]);
    //alert for quantity change
    useEffect(() => {
      axios.get("http://localhost:8070/product/")
        .then((res) => {
          setAllProducts(res.data);
          checkProductQuantity(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }, []);
  

    useEffect(()=>{
      axios.get("http://localhost:8070/product/").then((res)=>{
        setAllProducts(res.data)
      }).catch((err)=>{
        alert(err.message)
      })
    
  },[])

  const checkProductQuantity = (products) => {
    products.forEach(product => {
      if (product.quantity < 5) {
        toast.warn(`Product "${product.productName}" has quantity less than 5.`);
      }
    });
  };
//delete a product

const handleDelete=(id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    axios.delete(`http://localhost:8070/product/delete/${id}`)
        .then(response => {
            toast.info("Product is removed");
            // Refresh the product list after deletion
            setAllProducts(allProducts.filter(product => product._id !== id));
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
}
};
  return (
    <div className=' ml-10 px-4 my-12' style={{ backgroundColor: '#e5f2ff' }}>
        <h2 className='ml-10 mb-8 text-3xl font-bold'>Product Management. </h2>
        {/* table fpr product detailing */}
        <div className="overflow-x-auto">
      <Table className='lg:w-[1180px]'>
        <Table.Head>
        <Table.HeadCell>Number</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <span>
                Edit or Manage
            </span>
          </Table.HeadCell>
        </Table.Head>


        {
            allProducts.map((product,index)=>
            <Table.Body className="divide-y" key={product._id}>
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.productCategory} </Table.Cell>
            <Table.Cell>{product.quantity} </Table.Cell>
            <Table.Cell>{product.description}</Table.Cell>
            <Table.Cell>
              <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
              to={`/admin/dashboard/edit/${product._id}`}>
                Edit
              </Link>
              <button onClick={()=>handleDelete(product._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-3xl hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body>)
        }

      </Table>
      <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"

    /> 
    </div>

    </div>
  )
}

export default ManageProduct