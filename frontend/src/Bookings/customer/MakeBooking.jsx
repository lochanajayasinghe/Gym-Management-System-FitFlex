import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MakeBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    workoutType: '',
    packageType: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const timeSlots = [
    '09:00 AM - 10:00 AM', 
    '10:00 AM - 11:00 AM', 
    '11:00 AM - 12:00 PM', 
    '01:00 PM - 02:00 PM', 
    '02:00 PM - 03:00 PM', 
    '03:00 PM - 04:00 PM'
  ];
  
  const workoutTypes = [
    'ZUMBA', 
    'Strength Training', 
    'Yoga', 
    'HIIT', 
    'Aerobics', 
    'Callisthenics', 
    'Body weight training'
  ];
  
  const packages = [
    { name: 'Silver', price: '$49/month' },
    { name: 'Gold', price: '$79/month' },
    { name: 'Platinum', price: '$99/month' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
    if (!formData.workoutType) newErrors.workoutType = 'Workout type is required';
    if (!formData.packageType) newErrors.packageType = 'Package is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.text('FITNESS CENTER BOOKING CONFIRMATION', 105, 20, null, null, 'center');
    
    // Add content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    doc.text(`Date: ${formData.date}`, 20, 40);
    doc.text(`Time Slot: ${formData.timeSlot}`, 20, 50);
    doc.text(`Workout Type: ${formData.workoutType}`, 20, 60);
    doc.text(`Package: ${formData.packageType}`, 20, 70);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for your booking!', 105, 150, null, null, 'center');
    doc.text('Contact us: info@fitnesscenter.com', 105, 160, null, null, 'center');
    
    doc.save('fitness_booking_confirmation.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('http://localhost:8070/bookings', formData);
      
      generatePDF();
      toast.success('Booking successful! Redirecting...', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        navigate('/BookingDetails');
      }, 2500);
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Booking failed. Please try again.', {
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-10"></div>
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp12425019.jpg')" }}
      >
        
        <div className="max-w-md w-full bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Book Your Workout Session
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to schedule your session
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Time Slot Field */}
              <div>
                <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${errors.timeSlot ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.timeSlot && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>
                )}
              </div>

              {/* Workout Type Field */}
              <div>
                <label htmlFor="workoutType" className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Type
                </label>
                <select
                  id="workoutType"
                  name="workoutType"
                  value={formData.workoutType}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${errors.workoutType ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select workout type</option>
                  {workoutTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.workoutType && (
                  <p className="mt-1 text-sm text-red-600">{errors.workoutType}</p>
                )}
              </div>

              {/* Package Type Field */}
              <div>
                <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-1">
                  Package
                </label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${errors.packageType ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg, index) => (
                    <option key={index} value={pkg.name}>
                      {pkg.name} ({pkg.price})
                    </option>
                  ))}
                </select>
                {errors.packageType && (
                  <p className="mt-1 text-sm text-red-600">{errors.packageType}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Book Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MakeBooking;