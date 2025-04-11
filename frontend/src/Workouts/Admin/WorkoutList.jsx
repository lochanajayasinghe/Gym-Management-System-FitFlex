import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const WorkoutList = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8070/workouts');
        setWorkouts(response.data || []);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError('Error fetching workouts. Please try again.');
        toast.error('Failed to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/workouts/${id}`);
      setWorkouts(workouts.filter(workout => workout._id !== id));
      toast.success('Workout deleted successfully');
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Error deleting workout. Please try again.');
      toast.error('Failed to delete workout');
    }
  };

  const calculateOverallCalories = (exercises) => {
    if (!exercises || !Array.isArray(exercises)) return 0;
    return exercises.reduce((total, exercise) => total + (exercise.approximateCalories || 0), 0);
  };

  const filteredWorkouts = workouts.filter(workout =>
    workout.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center p-5" 
        style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2024/05/31/14/36/ai-generated-8800694_1280.png')` }}>
        <div className="w-full max-w-4xl bg-white bg-opacity-60 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-gray-700 mb-6">Loading Workouts...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center p-5" 
        style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2024/05/31/14/36/ai-generated-8800694_1280.png')` }}>
        <div className="w-full max-w-4xl bg-white bg-opacity-60 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-gray-700 mb-6">Error Loading Workouts</h2>
          <p className="text-red-600 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 rounded-[14px] font-medium text-white bg-orange-800 hover:bg-orange-900 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-cover bg-center p-5" 
      style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2024/05/31/14/36/ai-generated-8800694_1280.png')` }}>
      <Toaster position="top-right" />
      
      <div className="w-full max-w-6xl mx-auto bg-white bg-opacity-60 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-700">Workout List</h2>
          <div className="flex space-x-4">
            <Link 
              to="/admin/dashboard/ExerciseList" 
              className="px-6 py-2 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              View Exercises
            </Link>
            <Link 
              to="/admin/dashboard/WorkoutForm" 
              className="px-6 py-2 rounded-[14px] font-medium text-white bg-orange-800 hover:bg-orange-900 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Add Workout
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by workout name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] focus:outline-none"
          />
        </div>

        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map(workout => (
              <div key={workout._id} className="bg-white bg-opacity-80 border-2 border-[#a07628] rounded-[14px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-5">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{workout.name || 'Unnamed Workout'}</h3>
                  <p className="text-gray-600 mb-4">{workout.description || 'No description available'}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Exercises:</h4>
                    <ul className="space-y-3">
                      {(workout.exercises || []).map((exercise, index) => (
                        <li key={index} className="border-b border-gray-200 pb-2 last:border-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800">
                                {index + 1}. {exercise.exname || 'Unnamed Exercise'}
                              </p>
                              <p className="text-sm text-gray-600">Reps: {exercise.reps || 'N/A'}</p>
                              <p className="text-sm text-gray-600">Calories: {exercise.approximateCalories || 'N/A'}</p>
                            </div>
                            {exercise.videoUrl && (
                              <a 
                                href={exercise.videoUrl} 
                                className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                Watch
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-green-700">
                      Total Calories: {calculateOverallCalories(workout.exercises)}
                    </p>
                    <button 
                      onClick={() => handleDeleteWorkout(workout._id)} 
                      className="px-4 py-2 bg-red-600 text-white rounded-[14px] hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No workouts found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 rounded-[14px] font-medium text-white bg-orange-800 hover:bg-orange-900 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;