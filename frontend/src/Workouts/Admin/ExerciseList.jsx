import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Edit, Delete, PlayCircle, Add } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const [editReps, setEditReps] = useState('');
  const [editCalories, setEditCalories] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8070/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast.error('Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.exname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/exercises/${id}`);
      setExercises(exercises.filter(exercise => exercise._id !== id));
      toast.success('Exercise deleted successfully');
    } catch (error) {
      console.error('Error deleting exercise:', error);
      toast.error('Failed to delete exercise');
    }
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setEditReps(exercise.reps);
    setEditCalories(exercise.approximateCalories);
  };

  const handleSaveEdit = async () => {
    if (editReps < 0 || editCalories < 0) {
      toast.error('Values cannot be negative');
      return;
    }

    try {
      await axios.put(`http://localhost:8070/exercises/edit/${editingExercise._id}`, { 
        reps: editReps, 
        approximateCalories: editCalories 
      });
      
      setExercises(exercises.map(exercise => {
        if (exercise._id === editingExercise._id) {
          return { ...exercise, reps: editReps, approximateCalories: editCalories };
        }
        return exercise;
      }));
      
      toast.success('Exercise updated successfully');
      setEditingExercise(null);
    } catch (error) {
      console.error('Error updating exercise:', error);
      toast.error('Failed to update exercise');
    }
  };

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp13630257.jpg')` }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
      
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Exercise Management</h2>
            <div className="flex space-x-4">
              <Link 
                to="/admin/dashboard/WorkoutList" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
              >
                View Workouts
              </Link>
              <Link 
                to="/admin/dashboard/ExerciseForm" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
              >
                <Add className="mr-1" /> Add Exercise
              </Link>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.length > 0 ? (
                filteredExercises.map(exercise => (
                  <div 
                    key={exercise._id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={exercise.imageUrl} 
                        alt={exercise.exname} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Exercise+Image';
                        }}
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{exercise.exname}</h3>
                      <p className="text-gray-600 mb-3">{exercise.description}</p>
                      
                      <div className="flex justify-between mb-3">
                        <div>
                          <span className="font-medium">Reps: </span>
                          {editingExercise?._id === exercise._id ? (
                            <input
                              type="number"
                              value={editReps}
                              onChange={(e) => setEditReps(parseInt(e.target.value))}
                              className="w-20 border border-gray-300 rounded px-2 py-1"
                              min="0"
                            />
                          ) : (
                            <span>{exercise.reps}</span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Calories: </span>
                          {editingExercise?._id === exercise._id ? (
                            <input
                              type="number"
                              value={editCalories}
                              onChange={(e) => setEditCalories(parseInt(e.target.value))}
                              className="w-20 border border-gray-300 rounded px-2 py-1"
                              min="0"
                            />
                          ) : (
                            <span className="text-green-600">{exercise.approximateCalories}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
                        >
                          <PlayCircle className="mr-1" /> Watch Video
                        </a>
                        
                        <div className="flex space-x-2">
                          {editingExercise?._id === exercise._id ? (
                            <button
                              onClick={handleSaveEdit}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center transition-colors duration-300"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(exercise)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center transition-colors duration-300"
                            >
                              <Edit className="mr-1" /> Edit
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDelete(exercise._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center transition-colors duration-300"
                          >
                            <Delete className="mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 bg-white bg-opacity-80 rounded-lg">
                  <p className="text-gray-600 text-lg">
                    {searchTerm ? 'No matching exercises found' : 'No exercises available'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;