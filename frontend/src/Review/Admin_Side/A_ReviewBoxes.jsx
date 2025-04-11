import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ComplaintsBoxes() {
  return (
      <div className="flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114163.jpg')`,
      }}>
        
        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg m-4 max-w-md">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <img src="https://i.pinimg.com/736x/a6/9f/59/a69f59832bc0ccd4648d3ce206d18384.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h2 className="card-title text-xl mb-4">Instructor Reviews</h2>
                  <p className="card-text mb-6">Check out what others are saying about our instructors!</p>
                  <Link
                    to="/admin/dashboard/a_Instructor"
                    className="btn btn-primary py-2 px-4 rounded-lg text-white inline-block"
                    style={{ backgroundColor: '#007bff' }}
                  >
                    Check Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg m-4 max-w-md"
          style={{ maxWidth: '500px' }}>
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <img src="https://st2.depositphotos.com/4428871/10056/v/950/depositphotos_100562952-stock-illustration-workout-word-cloud-fitness.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h2 className="card-title text-xl mb-4">Workout Reviews</h2>
                  <p className="card-text mb-6">Read reviews about our workout plans!</p>
                  <Link
                    to="/admin/dashboard/a_workout"
                    className="btn btn-primary py-2 px-4 rounded-lg text-white inline-block"
                    style={{ backgroundColor: '#007bff' }}
                  >
                    Check Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg m-4 max-w-md"
          style={{ maxWidth: '500px' }}>
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <img src="https://scrumorg-website-prod.s3.amazonaws.com/drupal/inline-images/2023-07/product_wordcloud.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h2 className="card-title text-xl mb-4">Product Reviews</h2>
                  <p className="card-text mb-6">Explore what others are saying about our products!</p>
                  <Link
                    to="/admin/dashboard/a_product"
                    className="btn btn-primary py-2 px-4 rounded-lg text-white inline-block"
                    style={{ backgroundColor: '#007bff' }}
                  >
                    Check Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
