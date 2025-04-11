import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmPayment = ({ totalPrice }) => {
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold text-white">Confirm Payment</h2>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <span className="font-bold text-sky-500 mr-5">Total price:</span>
          <span className="font-bold text-darkgreen text-2xl">Rs {totalPrice}</span>
        </div>
        <Link to="/payment_confirmation">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Confirm Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPayment;
