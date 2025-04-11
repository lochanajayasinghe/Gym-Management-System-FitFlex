import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import InstructorRating from "./InstructorRating";

export default function A_Instructor() {
  const [others, setOthers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getOthers() {
      try {
        const response = await axios.get("http://localhost:8070/Instruct_review/");
        const formattedData = response.data.map(instructor => ({
          ...instructor,
          stars: Number(instructor.stars) || 0,
          percent: Number(instructor.percent) || 0
        }));
        setOthers(formattedData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getOthers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOthers = others.filter((instructor) =>
    instructor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePopup = (category) => {
    setSelectedCategory(category);
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const formatRating = (rating) => {
    const num = Number(rating);
    return isNaN(num) ? 0 : num.toFixed(1);
  };

  const renderStars = (rating) => {
    const num = Number(rating) || 0;
    const fullStars = Math.floor(num);
    const hasHalfStar = num % 1 >= 0.5;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-6 fixed h-full shadow-lg">
        
          <h2 className="text-2xl font-bold mb-20">Review Categories</h2>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/show_I" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg bg-gray-700"
              >
                Instructor Reviews
              </Link>
            </li>
            <li>
              <Link 
                to="/show_W" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg"
              >
                Workout Reviews
              </Link>
            </li>
            <li>
              <Link 
                to="/show_P" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg"
              >
                Product Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Navbar />
        
        {/* Main Content - Full Page Coverage */}
        
        <div className="ml-64 flex-1 min-h-screen">
          <div 
            className="bg-cover bg-center bg-no-repeat bg-fixed w-full h-full"
            style={{
              backgroundImage: `url('https://wallpapercave.com/wp/wp12424894.jpg')`,
            }}
          >
            <div className="bg-black bg-opacity-50 w-full min-h-screen">
              <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="pt-20"></div>
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Instructor Reviews
                  </h1>
                  <p className="text-xl text-gray-200">
                    See what our members say about our instructors
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                  <Link
                    to="/Review_instructor"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    Write a Review
                  </Link>
                  <button
                    onClick={() => togglePopup("Overall")}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    See Overall Ratings
                  </button>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-10">
                  <input
                    type="text"
                    placeholder="Search by instructor name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
                  />
                </div>

                {/* Reviews List */}
                <div className="max-w-4xl mx-auto">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      <p className="mt-4 text-white">Loading reviews...</p>
                    </div>
                  ) : filteredOthers.length > 0 ? (
                    filteredOthers.map((instructor) => (
                      <div 
                        key={instructor._id || Math.random()} 
                        className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-6 transition-transform hover:scale-[1.02]"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                              {instructor.name || "Unknown Instructor"}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {instructor.description || "No description available"}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-xl mr-2">
                              {renderStars(instructor.stars)}
                            </span>
                            <span className="text-gray-700 font-medium">
                              ({formatRating(instructor.stars)})
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${instructor.percent || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-right text-sm text-gray-500 mt-1">
                            {instructor.percent || 0}% positive feedback
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white bg-opacity-80 rounded-xl">
                      <p className="text-xl text-gray-700">
                        {searchTerm ? 
                          `No instructors found matching "${searchTerm}"` : 
                          'No instructor reviews available yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory} Review Details
                  </h2>
                  <button 
                    onClick={closePopup}
                    className="text-gray-500 hover:text-gray-700 text-3xl"
                  >
                    &times;
                  </button>
                </div>
                <InstructorRating category={selectedCategory} />
                <div className="mt-6 text-center">
                  <button
                    onClick={closePopup}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}