import React, { useState } from "react";
import InstructorRating from "../User_Side/InstructorRating";
import WorkoutRating from "../User_Side/WorkoutRating";
import ProductRating from "../User_Side/ProductRating";

const ReviewDistribution = () => {
  const [showInstructorPopup, setShowInstructorPopup] = useState(false);
  const [showWorkoutPopup, setShowWorkoutPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);

  // Function to toggle popup visibility for instructor review
  const toggleInstructorPopup = () => {
    setShowInstructorPopup(!showInstructorPopup);
  };

  // Function to toggle popup visibility for workout review
  const toggleWorkoutPopup = () => {
    setShowWorkoutPopup(!showWorkoutPopup);
  };

  // Function to toggle popup visibility for product review
  const toggleProductPopup = () => {
    setShowProductPopup(!showProductPopup);
  };

  return (
    <>
      
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover"
        style={{
          minHeight: '100vh',
          minWidth: '180vh', // Set minimum height to cover the viewport
          backgroundImage: `url('https://images4.alphacoders.com/134/thumb-1920-1345029.png')`,
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}>
        <div className="text-center">
          <div className="bg-white bg-opacity-70 border border-gray-300 p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-black mb-4">Overall Review Distribution</h1>
            
          </div>
          <div className="my-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleInstructorPopup}
            >
              Instructor Review Distribution
            </button>
          </div>
          {/* Pop-up for Instructor Review Distribution */}
            {showInstructorPopup && (
                <div className="popup bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg">
                <div className="popup_inner">
                    <span className="close" onClick={toggleInstructorPopup}>×</span>
                    <h2>Instructor Review Details</h2>
                    <InstructorRating />
                </div>
                </div>
            )}
          <div className="my-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleWorkoutPopup}
            >
              Workout Review Distribution
            </button>
          </div>
          {/* Pop-up for Workout Review Distribution */}
            {showWorkoutPopup && (
                <div className="popup bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg">
                <div className="popup_inner">
                    <span className="close" onClick={toggleWorkoutPopup}>×</span>
                    <h2>Workout Review Details</h2>
                    <WorkoutRating />
                </div>
                </div>
            )}
          <div className="my-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleProductPopup}
            >
              Product Review Distribution
            </button>
          </div>
          {/* Pop-up for Product Review Distribution */}
            {showProductPopup && (
                <div className="popup bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg">
                <div className="popup_inner">
                    <span className="close" onClick={toggleProductPopup}>×</span>
                    <h2>Product Review Details</h2>
                    <ProductRating />
                </div>
                </div>
            )}
        </div>
      </div>

      

      

      
    </>
  );
};

export default ReviewDistribution;
