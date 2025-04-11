import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function MyMeals() {
    return (
        <div className="flex flex-col min-h-screen">
            

            {/* Main Content */}
            <main className="flex-grow bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/28252346/pexels-photo-28252346/free-photo-of-hermoso-sandwich.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
                }}
            >

            <Navbar />
            <div className="pt-20"></div>
            {/* Hero Section */}
            <div className="bg-black bg-opacity-40 text-white py-8 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Calculate your BMI and Get Nutrition Plans</h1>
                <p className="text-lg mb-2">We would like your review to improve our website.</p>
                <p className="text-lg">Get personalized recommendations based on your health goals.</p>
            </div>

                <div className="w-full h-full bg-black bg-opacity-40 backdrop-blur-sm py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                            {/* BMI Calculator Card */}
                            <div className="w-full lg:w-1/3 max-w-md">
                                <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
                                    <img 
                                        src="https://media.istockphoto.com/id/528072248/photo/bmi-body-mass-index-written-on-a-notepad-sheet.jpg?b=1&s=612x612&w=0&k=20&c=A1_t_wz-GymukQ_BWCex8ezZs0pnU0pYu7mdN_zto_Q=" 
                                        className="w-full h-48 object-cover" 
                                        alt="BMI Calculator" 
                                    />
                                    <div className="p-6 text-center">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">BMI Calculator</h2>
                                        <Link 
                                            to="/BMI" 
                                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors duration-300"
                                        >
                                            Check Your BMI
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Nutrition Plan Card */}
                            <div className="w-full lg:w-1/3 max-w-md">
                                <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
                                    <img 
                                        src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                        className="w-full h-48 object-cover" 
                                        alt="Nutrition Plan" 
                                    />
                                    <div className="p-6 text-center">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrition Plan</h2>
                                        <Link 
                                            to="/UserForm" 
                                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors duration-300"
                                        >
                                            Get Personalized Meal Plan
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default MyMeals;