import React from "react";
import Navbar from "../components/Navbar";

const paysucc = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <img
            src="https://thumbs.dreamstime.com/b/payment-successful-template-vector-art-success-ful-206586442.jpg"
            alt="Payment Successful"
            className="w-full h-auto"
          />
          <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Your payment is successfully done</h2>
          <p className="text-gray-700 text-center">Thank you for your purchase!</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default paysucc;
