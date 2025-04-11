import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, PlayCircle, FitnessCenter, Add } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const MyWorkout = () => {
  // State management
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchExercises(), fetchWorkouts()]);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // API calls
  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:8070/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
    }
  };

  const handleAddToWorkout = async (exerciseId, workoutId) => {
    try {
      await axios.post(`http://localhost:8070/workouts/${workoutId}/exercises`, {
        exerciseId
      });
      toast.success('Exercise added to workout!');
      fetchWorkouts();
    } catch (error) {
      console.error('Error adding exercise:', error);
      toast.error('Failed to add exercise');
    }
  };

  // Derived data
  const categories = ['All', ...new Set(exercises.map(ex => ex.category).filter(Boolean))];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.exname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // UI Components
  const ExerciseCard = ({ exercise }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.exname} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=Exercise+Image';
          }}
        />
        {exercise.category && (
          <span className="absolute top-3 right-3 bg-orange-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
            {exercise.category}
          </span>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{exercise.exname}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{exercise.description}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <ExerciseDetail label="Reps" value={exercise.reps} />
            <ExerciseDetail label="Calories" value={exercise.approximateCalories} colored />
            <ExerciseDetail label="Sets" value={exercise.sets || 3} />
            <ExerciseDetail 
              label="Difficulty" 
              value={exercise.difficulty || 'Moderate'} 
              color={getDifficultyColor(exercise.difficulty)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <a
            href={exercise.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 mr-2"
          >
            <PlayCircle className="mr-2" /> Watch
          </a>
          
          {showWorkoutDropdown && (
            <button
              onClick={() => selectedWorkout && handleAddToWorkout(exercise._id, selectedWorkout)}
              disabled={!selectedWorkout}
              className={`w-1/2 flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 ml-2 ${
                selectedWorkout 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Add className="mr-2" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ExerciseDetail = ({ label, value, colored = false, color }) => (
    <div className="bg-gray-50 p-2 rounded-lg">
      <span className="block text-sm font-medium text-gray-500">{label}</span>
      <span className={`text-lg font-semibold ${colored ? 'text-green-600' : ''} ${color || ''}`}>
        {value}
      </span>
    </div>
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="flex-grow bg-cover bg-center bg-fixed pt-20"
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp13630257.jpg')" }}>
        
        {/* Hero Section */}
        <div className="bg-black bg-opacity-70 text-white py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Build Your Perfect Workout Routine</h1>
          <p className="text-xl mb-2">Discover exercises tailored to your fitness goals</p>
          <p className="text-xl">Track your progress and achieve better results</p>
        </div>

        <div className="w-full h-full bg-black bg-opacity-50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-4">
            {/* Main Content Card */}
            <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 mb-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div className="flex items-center mb-4 md:mb-0">
                  <FitnessCenter className="text-4xl text-orange-600 mr-3" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Exercise Library</h2>
                    <p className="text-gray-600">
                      Browse our comprehensive collection of exercises
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link 
                    to="/WorkoutUserView" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <FitnessCenter className="mr-2" /> My Workouts
                  </Link>
                  
                  <button
                    onClick={() => setShowWorkoutDropdown(!showWorkoutDropdown)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <Add className="mr-2" /> {showWorkoutDropdown ? 'Hide Add Options' : 'Add to Workout'}
                  </button>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search exercises by name..."
                    className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                >
                  <option value="All">All Categories</option>
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Workout selection dropdown */}
              {showWorkoutDropdown && workouts.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Workout to Add Exercises:
                  </label>
                  <select
                    value={selectedWorkout || ''}
                    onChange={(e) => setSelectedWorkout(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select a workout...</option>
                    {workouts.map(workout => (
                      <option key={workout._id} value={workout._id}>
                        {workout.name} ({workout.exercises?.length || 0} exercises)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Exercise Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredExercises.length > 0 ? (
                    filteredExercises.map(exercise => (
                      <ExerciseCard key={exercise._id} exercise={exercise} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="bg-gray-50 rounded-xl p-8 inline-block">
                        <FitnessCenter className="text-5xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-medium text-gray-600 mb-2">
                          {searchTerm ? 'No exercises found' : 'Exercise library is empty'}
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm ? 'Try a different search term' : 'Check back later for new exercises'}
                        </p>
                      </div>
                    </div>
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
};

export default MyWorkout;