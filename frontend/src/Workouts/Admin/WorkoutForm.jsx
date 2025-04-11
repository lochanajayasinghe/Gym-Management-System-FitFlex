import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function WorkoutForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: []
  });
  const [exercises, setExercises] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8070/exercises')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
        toast.error('Failed to load exercises');
      });
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Workout name is required';
      case 'description':
        return value.trim() ? '' : 'Description is required';
      case 'exercises':
        return value.length > 0 ? '' : 'At least one exercise is required';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleSelectChange = e => {
    const { value } = e.target;
    const updatedExercises = [...formData.exercises, value];
    setFormData({ ...formData, exercises: updatedExercises });
    
    if (errors.exercises) {
      setErrors(prev => ({
        ...prev,
        exercises: validateField('exercises', updatedExercises)
      }));
    }
  };

  const handleRemoveExercise = index => {
    const updatedExercises = [...formData.exercises];
    updatedExercises.splice(index, 1);
    setFormData({ ...formData, exercises: updatedExercises });
    
    if (errors.exercises) {
      setErrors(prev => ({
        ...prev,
        exercises: validateField('exercises', updatedExercises)
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:8070/workouts/add', formData);
      toast.success('Workout added successfully!');
      setTimeout(() => navigate('/admin/dashboard/WorkoutList'), 1500);
    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error(error.response?.data?.message || 'Failed to add workout');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({ label, name, type = 'text', required = false, placeholder, textarea = false }) => (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows="4"
          className={`w-full p-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] focus:outline-none ${
            errors[name] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] focus:outline-none ${
            errors[name] ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center p-5" 
      style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2024/05/31/14/36/ai-generated-8800694_1280.png')` }}>
      <div className="w-full max-w-4xl bg-white bg-opacity-60 rounded-lg shadow-lg p-6">
        <Toaster position="top-right" />
        
        <h2 className="text-center text-4xl font-bold text-gray-700 mb-6">Create New Workout</h2>
        
        <form onSubmit={handleSubmit}>
          <FormField 
            label="Workout Name" 
            name="name" 
            required 
            placeholder="e.g. Morning Routine" 
          />
          
          <FormField 
            label="Description" 
            name="description" 
            required 
            textarea 
            placeholder="Describe the workout..." 
          />
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Select Exercises <span className="text-red-500">*</span>
            </label>
            <select
              onChange={handleSelectChange}
              className={`w-full p-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] focus:outline-none ${
                errors.exercises ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select an exercise</option>
              {exercises.map(exercise => (
                <option key={exercise._id} value={exercise._id}>{exercise.exname}</option>
              ))}
            </select>
            {errors.exercises && <p className="mt-1 text-sm text-red-600">{errors.exercises}</p>}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-2">Selected Exercises:</h3>
            {formData.exercises.length > 0 ? (
              <ul className="space-y-2">
                {formData.exercises.map((exerciseId, index) => {
                  const selectedExercise = exercises.find(exercise => exercise._id === exerciseId);
                  if (!selectedExercise) return null;
                  return (
                    <li key={exerciseId} className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-[14px] border border-[#a07628]">
                      <span className="font-medium">{selectedExercise.exname}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveExercise(index)} 
                        className="px-3 py-1 bg-red-600 text-white rounded-[14px] hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No exercises selected yet</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard/WorkoutList')}
              className="px-6 py-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-[14px] font-medium text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-orange-800 hover:bg-orange-900 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;