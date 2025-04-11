import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, ArrowRight, FitnessCenter, Search as SearchIcon } from '@mui/icons-material';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutUserView() {
  // State Management
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Data Fetching
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8070/workouts');
      setWorkouts(response.data);
    } catch (error) {
      handleError('Error fetching workouts:', error, 'Failed to load workouts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper Functions
  const handleError = (logMessage, error, toastMessage) => {
    console.error(logMessage, error);
    setError(toastMessage);
    toast.error(toastMessage);
  };

  const calculateOverallCalories = (exercises) => {
    if (!exercises || !Array.isArray(exercises)) return 0;
    return exercises.reduce((total, exercise) => total + (exercise.approximateCalories || 0), 0);
  };

  // Workout Actions
  const handleStartWorkout = async (id) => {
    try {
      setExercisesLoading(true);
      const workout = workouts.find(w => w._id === id);
      if (!workout) throw new Error('Workout not found');

      const totalCalories = calculateOverallCalories(workout.exercises);
      await axios.put(`http://localhost:8070/workouts/ongoing/${id}`, { totalCalories });
      
      setSelectedWorkout(workout);
      setCompletedExercises([]);
      toast.success('Workout started!');
    } catch (error) {
      handleError('Error starting workout:', error, 'Failed to start workout');
    } finally {
      setExercisesLoading(false);
    }
  };

  const handleCompleteExercise = async (exerciseId) => {
    try {
      if (!selectedWorkout) return;
      
      await axios.put(
        `http://localhost:8070/workouts/${selectedWorkout._id}/exercises/${exerciseId}/complete`
      );
      
      setCompletedExercises(prev => [...prev, exerciseId]);
      toast.success('Exercise completed!');
    } catch (error) {
      handleError('Error completing exercise:', error, 'Failed to complete exercise');
    }
  };

  const handleCompleteWorkout = async () => {
    try {
      if (!selectedWorkout) return;
      
      await axios.put(`http://localhost:8070/workouts/complete/${selectedWorkout._id}`);
      
      toast.success('Workout completed! Great job!');
      setSelectedWorkout(null);
      setCompletedExercises([]);
      fetchWorkouts();
    } catch (error) {
      handleError('Error completing workout:', error, 'Failed to complete workout');
    }
  };

  // Data Processing
  const categories = ['All', ...new Set(workouts.flatMap(workout => 
    workout.exercises?.map(ex => ex.category).filter(Boolean)
  ))];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      workout.exercises?.some(ex => ex.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // UI Components
  const ExerciseItem = ({ exercise, index, isCompleted, onComplete }) => (
    <li className={`p-3 rounded-lg ${isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-medium">
            {index + 1}. {exercise.name}
          </h5>
          <p className="text-sm text-gray-600">
            Reps: {exercise.reps} | Calories: {exercise.approximateCalories || 0}
          </p>
        </div>
        <div className="flex space-x-2">
          <a
            href={exercise.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-800"
          >
            <PlayCircle />
          </a>
          {!isCompleted && (
            <button
              onClick={() => onComplete(exercise._id)}
              className="text-green-600 hover:text-green-800"
            >
              <CheckCircle />
            </button>
          )}
        </div>
      </div>
    </li>
  );

  const WorkoutCard = ({ workout }) => (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
        selectedWorkout?._id === workout._id ? 'border-orange-500' : 'border-transparent'
      } transition-all duration-300 hover:shadow-lg`}
    >
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{workout.name}</h3>
        <p className="text-gray-600 mb-4">{workout.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-orange-600">
            Total Calories: {calculateOverallCalories(workout.exercises)}
          </span>
          <span className="text-sm text-gray-500">
            {workout.exercises?.length || 0} exercises
          </span>
        </div>

        <button
          onClick={() => handleStartWorkout(workout._id)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg flex items-center justify-center"
          disabled={exercisesLoading}
        >
          {exercisesLoading ? (
            'Loading...'
          ) : (
            <>
              <ArrowRight className="mr-2" /> 
              {selectedWorkout?._id === workout._id ? 'Continue Workout' : 'Start Workout'}
            </>
          )}
        </button>
      </div>

      {selectedWorkout?._id === workout._id && (
        <div className="border-t border-gray-200 p-5">
          <h4 className="font-bold text-lg mb-3">Exercises:</h4>
          <ul className="space-y-4">
            {workout.exercises?.map((exercise, index) => (
              <ExerciseItem
                key={exercise._id}
                exercise={exercise}
                index={index}
                isCompleted={completedExercises.includes(exercise._id)}
                onComplete={handleCompleteExercise}
              />
            ))}
          </ul>

          <button
            onClick={handleCompleteWorkout}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center"
            disabled={selectedWorkout?.exercises?.length !== completedExercises.length}
          >
            <CheckCircle className="mr-2" />
            Complete Workout
          </button>
        </div>
      )}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  const NoWorkoutsMessage = () => (
    <div className="col-span-full text-center py-8">
      <div className="bg-gray-50 rounded-xl p-8 inline-block">
        <FitnessCenter className="text-5xl text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-medium text-gray-600 mb-2">
          {searchTerm ? 'No workouts found' : 'No workouts available'}
        </h3>
        <p className="text-gray-500">
          {searchTerm ? 'Try a different search term' : 'Check back later for new workouts'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main 
        className="flex-grow bg-cover bg-center bg-fixed pt-20 pb-20"
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10555921.jpg')" }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="bg-black bg-opacity-70 text-white py-12 px-4 text-center rounded-lg mb-8">
              <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
                <FitnessCenter className="mr-3 text-orange-500" /> 
                Your Workout Plans
              </h1>
              <p className="text-xl">
                Browse and start your personalized workout routines
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-6 mb-8">
              {/* Search and Filter Section with Exercise Library Button */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full md:w-auto md:flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search workouts..."
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enhanced Exercise Library Button */}
                <Link 
                  to="/MyWorkout" 
                  className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <FitnessCenter className="mr-2 text-lg" />
                  <span className="font-medium">Exercise Library</span>
                </Link>
              </div>

              {/* Workout Cards Grid */}
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map(workout => (
                      <WorkoutCard key={workout._id} workout={workout} />
                    ))
                  ) : (
                    <NoWorkoutsMessage />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WorkoutUserView;