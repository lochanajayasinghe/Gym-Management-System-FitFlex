import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar';

const BookingRequest = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'schedule'
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8070/bookings');
      setBookings(response.data);
      prepareScheduleData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const prepareScheduleData = (bookings) => {
    const timeSlots = bookings.map(booking => ({
      time: booking.timeSlot,
      date: new Date(booking.date),
      day: new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long' }),
      workoutType: booking.workoutType,
      status: booking.status
    }));

    const groupedTimeSlots = timeSlots.reduce((acc, booking) => {
      acc[booking.time] = acc[booking.time] || {};
      acc[booking.time][booking.day] = acc[booking.time][booking.day] || [];
      acc[booking.time][booking.day].push({
        date: booking.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        workoutType: booking.workoutType,
        status: booking.status
      });
      return acc;
    }, {});

    // Sort time slots chronologically
    const sortedTimeSlots = Object.entries(groupedTimeSlots).sort((a, b) => {
      // Convert time to minutes for comparison (e.g., "9:00 AM" -> 540)
      const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        return (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes;
      };
      return timeToMinutes(a[0]) - timeToMinutes(b[0]);
    });

    setScheduleData(sortedTimeSlots);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/bookings/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
      prepareScheduleData(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to delete booking.');
    }
  };

  const approveBooking = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8070/bookings/approve/${id}`);
      if (response.status === 200) {
        const updatedBookings = bookings.map(booking =>
          booking._id === id ? { ...booking, status: 'Confirmed' } : booking
        );
        setBookings(updatedBookings);
        prepareScheduleData(updatedBookings);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
      setError('Failed to approve booking.');
    }
  };

  const filteredBookings = searchQuery
    ? bookings.filter(booking =>
        booking.workoutType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.packageType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.timeSlot?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.date?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : bookings;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center p-5" 
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp13630257.jpg')" }}>
        
        <div className="w-full max-w-6xl bg-white bg-opacity-60 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-4xl font-bold text-grey-500">
              {view === 'list' ? 'Booking Requests' : 'Booking Schedule'}
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-orange-800 text-white' : 'bg-gray-200'}`}
              >
                List View
              </button>
              <button
                onClick={() => setView('schedule')}
                className={`px-4 py-2 rounded-lg ${view === 'schedule' ? 'bg-orange-800 text-white' : 'bg-gray-200'}`}
              >
                Schedule View
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-600" />
              </div>
              <input
                type="text"
                placeholder={`Search ${view === 'list' ? 'bookings' : 'schedule'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-10 pr-4 rounded-[14px] text-[13pt] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-600 hover:text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : view === 'list' ? (
            <div className="w-full flex justify-center items-center px-4 overflow-hidden">
              <table className="w-full max-w-5xl bg-black bg-opacity-40 border-collapse rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-orange-800 text-white">
                    <th className="p-4 text-sm font-semibold text-left">Date</th>
                    <th className="p-4 text-sm font-semibold text-left">Time Slot</th>
                    <th className="p-4 text-sm font-semibold text-left">Workout Type</th>
                    <th className="p-4 text-sm font-semibold text-left">Package</th>
                    <th className="p-4 text-sm font-semibold text-left">Status</th>
                    <th className="p-4 text-sm font-semibold text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-700 h-16">
                        <td className="text-white p-4 text-sm font-bold">{formatDate(booking.date)}</td>
                        <td className="text-white p-4 text-sm">{booking.timeSlot}</td>
                        <td className="text-white p-4 text-sm">{booking.workoutType}</td>
                        <td className="text-white p-4 text-sm">{booking.packageType}</td>
                        <td className="text-white p-4 text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="text-white p-4 text-sm space-x-3">
                          {booking.status === 'Pending' && (
                            <button
                              onClick={() => approveBooking(booking._id)}
                              className="bg-green-600 text-white px-3 py-2 rounded-lg"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(booking._id)}
                            disabled={booking.status === 'Confirmed'}
                            className={`bg-red-600 text-white px-3 py-2 rounded-lg ${
                              booking.status === 'Confirmed' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-white p-4 text-center text-sm">
                        {searchQuery ? 'No matching bookings found' : 'No bookings available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full bg-black bg-opacity-40 border-collapse rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-orange-800 text-white">
                    <th className="p-4 text-sm font-semibold text-left">Time Slot</th>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <th key={day} className="p-4 text-sm font-semibold text-left">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map(([timeSlot, dayData]) => (
                    <tr key={timeSlot} className="border-b border-gray-700">
                      <td className="text-white p-4 text-sm font-bold">{timeSlot}</td>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <td key={day} className="text-white p-4 text-sm">
                          {dayData[day]?.map((booking, index) => (
                            <div key={index} className="mb-2">
                              <div className="font-medium">{booking.workoutType}</div>
                              <div className="text-xs">{booking.date}</div>
                              <span className={`text-xs px-1 rounded ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingRequest;