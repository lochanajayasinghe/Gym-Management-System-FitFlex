import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isValidCardNumber, setIsValidCardNumber] = useState(false);
  const [isValidCvv, setIsValidCvv] = useState(false);

  // Function to handle card number change
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const isValidNumber = /^\d{12}$/.test(input); // Check if input contains exactly 12 digits
    setCardNumber(input);
    setIsValidCardNumber(isValidNumber);
  };

  // Function to handle CVV change
  const handleCvvChange = (e) => {
    const input = e.target.value;
    const isValidCvv = /^\d{3}$/.test(input); // Check if input contains exactly 3 digits
    setCvv(input);
    setIsValidCvv(isValidCvv);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // If all validations pass, submit the form
    if (isValidCardNumber && isValidCvv) {
      const newCard = {
        cardName: name,
        cardNumber,
        expiredate: expiryDate,
        cvvNumber: cvv
      };

      axios.post("http://localhost:8070/card/add", newCard)
        .then(() => {
          alert("Card details added successfully");
          // Clear form fields after successful submission
          setCardNumber("");
          setExpiryDate(new Date());
          setCvv("");
          setName("");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to add card details");
        });
    } else {
      alert("Please fill out the form correctly.");
    }
  };

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
          backgroundImage: `url('https://bmpos.com.vn/wp-content/uploads/2021/03/the-tin-dung-noi-dia.jpg')`,
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}>
        <div className="max-w-sm mt-20 mx-auto">   
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'inherit' }}>Card Payment</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name 
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter the name in the card"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      isValidCardNumber ? 'border-green-500' : 'border-red-500'
                    }`}
                    id="cardNumber"
                    type="text"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                  {!isValidCardNumber && (
                    <p className="text-red-500 text-xs italic">Please enter a valid card number with 12 numbers.</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <DatePicker
                    selected={expiryDate}
                    onChange={date => setExpiryDate(date)}
                    dateFormat="MM/yy"
                    className={`shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      isValidCardNumber ? 'border-green-500' : 'border-red-500'
                    }`}
                    minDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      isValidCvv ? 'border-green-500' : 'border-red-500'
                    }`}
                    id="cvv"
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                  />
                  {!isValidCvv && (
                    <p className="text-red-500 text-xs italic">Please enter the 3-digit number on the back of your card.</p>
                  )}
                </div>
                <br />
                <div className="flex justify-between">
                  <button
                    className={`${
                      isValidCardNumber && isValidCvv ? 'bg-green-500' : 'bg-red-500'
                    } text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={!isValidCardNumber || !isValidCvv}
                  >
                    <Link to="/paysucc">Confirm Payment</Link>
                  </button>
                  <div className="open_button" style={{ textAlign: 'center' }}>
                    <Link to="/view_cards" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">View Previous Cards</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
