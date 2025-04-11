import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function choose_payment_method() {
  return (
    <>
      <Navbar />
      <div>
        <br></br>
        <br></br>
      </div>
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover"
        style={{
          minHeight: '100vh', // Set minimum height to cover the viewport
          backgroundImage: `url('https://wallpaperaccess.com/full/4597150.jpg')`,
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}
      >
      <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
           style={{   
        border: '1px solid #ccc', // Border color and thickness
        padding: '20px', // Padding around the form elements
        borderRadius: '5px', // Rounded corners
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Box shadow for a subtle 3D effect
        margin: '20px auto', // Center the box horizontally and add some space around it
        maxWidth: '800px' // Limit the maximum width of the box
        }}>
        <div className="row">
          <div className="col mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://c4.wallpaperflare.com/wallpaper/760/223/715/plastic-money-credit-cards-visa-wallpaper-preview.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '30px' }}>Card Payments</h2>
                <p className="card-text" style={{ marginBottom: '15px' }}>A cashless payment method where customers pay for their purchases with their debit or credit card</p>
                <Link to="/card" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Pay Now!</Link> {/* Change href="#" to to="/form" */}
              </div>
            </div>
          </div>
        </div>
      </div>  

      <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
          style={{
        border: '1px solid #ccc', // Border color and thickness
        padding: '20px', // Padding around the form elements
        borderRadius: '5px', // Rounded corners
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Box shadow for a subtle 3D effect
        margin: '20px auto', // Center the box horizontally and add some space around it
        maxWidth: '800px' // Limit the maximum width of the box
        }}>
        <div className="row">
          <div className="col mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://media.istockphoto.com/id/850942600/photo/ill-pay-cash.jpg?s=612x612&w=0&k=20&c=7ueg6McHQSrHu_TDRSDoTwoa6kVjuEecMdSx4oLYKMI=" className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '30px' }}>Cash Payments</h2>
                <p className="card-text" style={{ marginBottom: '15px' }}>Pay cash, upload slip for easy transaction!</p>
                <Link to="/slp" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Pay Now!</Link> {/* Change href="#" to to="/form" */}
              </div>
            </div>
          </div>
        </div>
      </div> 

    </div>
    
    </>
  );
}


