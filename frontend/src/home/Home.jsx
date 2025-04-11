import React, { useState } from 'react';

import HomeBanner from '../components/HomeBanner';
import ProductHome from '../components/ProductHome';
import WorkoutHome from '../components/WorkoutHome';
import BookingHome from '../components/BookingHome';
import ReviewHome from '../components/ReviewHome';
import MealHome from '../components/MealHome';
import Navbar from '../components/Navbar';

const Home = () => {
  const [cart, setCart] = useState([]);

  const handleClick = (product) => {
    let isPresent = cart.some((item) => product._id === item._id);
    if (!isPresent) {
      setCart([...cart, product]);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar size={cart.length} />

      {/* Home Banner */}
      <div className="w-full bg-black text-white py-10" style={{ minHeight: '100vh' }}>
        <HomeBanner />
      </div>

      {/* Grid Layout for Components */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <h1 className="text-center text-4xl font-bold text-gray-100 mb-12">Explore Our Features</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Workout Component */}
          <div className="bg-gray-400 bg-opacity-80 border border-gray-300 p-5 rounded-lg shadow-lg">
            <WorkoutHome />
          </div>

          {/* Meal Component */}
          <div className="bg-gray-400 bg-opacity-80 border border-gray-300 p-5 rounded-lg shadow-lg">
            <MealHome />
          </div>

          {/* Booking Component */}
          <div className="bg-gray-400 bg-opacity-80 border border-gray-300 p-5 rounded-lg shadow-lg">
            <BookingHome />
          </div>

          {/* Product Component */}
          <div className="bg-gray-400 bg-opacity-80 border border-gray-300 p-5 rounded-lg shadow-lg">
            <ProductHome />
          </div>

          {/* Review Component */}
          <div className="bg-gray-400  bg-opacity-80 border border-gray-300 p-5 rounded-lg shadow-lg">
            <ReviewHome />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
