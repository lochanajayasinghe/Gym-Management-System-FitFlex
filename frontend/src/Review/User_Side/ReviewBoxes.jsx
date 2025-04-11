import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ComplaintsBoxes() {
  return (
    <>
      <Navbar />
      <div
        className="contact_form flex items-center justify-center bg-cover pt-4"
        style={{
          minHeight: '100vh',
          backgroundImage: `url('https://wallpapercave.com/wp/wp12840545.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white"> Reviews</h1>
            <p className="text-xl text-white mt-2">
              We would like your review to improve our website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instructor Reviews Card */}
            <div className="bg-white bg-opacity-80 border border-gray-300 p-6 rounded-lg shadow-lg">
              <div className="card" style={{ width: '100%' }}>
                <img 
                  src="https://i.pinimg.com/736x/a6/9f/59/a69f59832bc0ccd4648d3ce206d18384.jpg" 
                  className="card-img-top rounded-t-lg" 
                  alt="Instructor Reviews"
                />
                <div className="card-body p-4">
                  <h2 className="card-title text-2xl font-bold mb-3">Instructor Reviews</h2>
                  <p className="card-text mb-4">
                    Check out what others are saying about our instructors!
                  </p>
                  <Link 
                    to="/show_I" 
                    className="btn btn-primary inline-block px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Show Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* Workout Reviews Card */}
            <div className="bg-white bg-opacity-80 border border-gray-300 p-6 rounded-lg shadow-lg">
              <div className="card" style={{ width: '100%' }}>
                <img 
                  src="https://st2.depositphotos.com/4428871/10056/v/950/depositphotos_100562952-stock-illustration-workout-word-cloud-fitness.jpg" 
                  className="card-img-top rounded-t-lg" 
                  alt="Workout Reviews"
                />
                <div className="card-body p-4">
                  <h2 className="card-title text-2xl font-bold mb-3">Workout Reviews</h2>
                  <p className="card-text mb-4">
                    Read reviews about our workout plans!
                  </p>
                  <Link 
                    to="/show_W" 
                    className="btn btn-primary inline-block px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Show Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Reviews Card */}
            <div className="bg-white bg-opacity-80 border border-gray-300 p-6 rounded-lg shadow-lg">
              <div className="card" style={{ width: '100%' }}>
                <img 
                  src="https://scrumorg-website-prod.s3.amazonaws.com/drupal/inline-images/2023-07/product_wordcloud.jpg" 
                  className="card-img-top rounded-t-lg" 
                  alt="Product Reviews"
                />
                <div className="card-body p-4">
                  <h2 className="card-title text-2xl font-bold mb-3">Product Reviews</h2>
                  <p className="card-text mb-4">
                    Explore what others are saying about our products!
                  </p>
                  <Link 
                    to="/show_p" 
                    className="btn btn-primary inline-block px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Show Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}