import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://wallpapercave.com/uwp/uwp4614402.jpeg')`,
        }}
      >
        <div className="w-full max-w-6xl px-4 py-12">
          {/* Main Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Customer Reviews
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
              Share your experience and help us improve our services
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl items-centeroverflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Share Your Feedback
                </h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              </div>

              
                {/* Review Card */}
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        Reviews & Ratings
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Your honest feedback helps us enhance our services and 
                        create better experiences for all our customers.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to="/reviewBoxes"
                        className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                      >
                        View All Reviews
                      </Link>
                    </div>
                  </div>
                </div>

                
                
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}