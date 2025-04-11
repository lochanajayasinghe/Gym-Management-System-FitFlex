import React from "react";
import { Link } from "react-router-dom";


export default function ContactUs() {
  return (
    <>
     
      <div>
        <h1
          className="text-white text-center mb-8 text-2xl font-semibold"
        >
          Reviews
        </h1>
      </div>
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen p-20"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/022/653/988/original/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg')`,
        }}
      >
        <div
          className="bg-white bg-opacity-50 border border-gray-300 p-8 rounded-lg shadow-lg"
        >
          <div className="contact_form_title">
            <h1 className="text-gray-700 text-center mb-8 text-4xl font-semibold">
              Reviews
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <div
                className="card bg-gray-100 rounded-lg shadow-md p-6 h-full"
              >
                <h5 className="card-title text-gray-700 text-2xl font-semibold mb-4">
                  Distribution
                </h5>
                <p className="card-text text-gray-600 mb-4">
                  Check Overall Review Distribution from here
                </p>
                <Link
                  to="/admin/dashboard/distribution"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md transition duration-300"
                >
                  Open
                </Link>
              </div>
            </div>  
            <div className="mb-4">
              <div
                className="card bg-gray-100 rounded-lg shadow-md p-6 h-full"
              >
                <h5 className="card-title text-gray-700 text-2xl font-semibold mb-4">
                  Review & Rating
                </h5>
                <p className="card-text text-gray-600 mb-4">
                  We would like your review to improve our website. So Please
                  share your opinion
                </p>
                <Link
                  to="/admin/dashboard/a_ReviewBoxes"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md transition duration-300"
                >
                  Go to Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
