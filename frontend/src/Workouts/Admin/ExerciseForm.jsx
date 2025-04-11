import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const ExerciseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    exname: '',
    description: '',
    reps: '',
    imageUrl: '',
    videoUrl: '',
    category: '',
    approximateCalories: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = ['Abs', 'Chest', 'Legs', 'Back', 'Arms', 'Shoulders', 'Cardio', 'Full Body'];

  const validateField = (name, value) => {
    switch (name) {
      case 'exname':
        return value.trim() ? '' : 'Exercise name is required';
      case 'description':
        return value.trim() ? '' : 'Description is required';
      case 'reps':
        return value > 0 ? '' : 'Valid reps count is required';
      case 'approximateCalories':
        return value > 0 ? '' : 'Valid calorie count is required';
      case 'category':
        return value ? '' : 'Category is required';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'imageUrl' && key !== 'videoUrl') {
        newErrors[key] = validateField(key, formData[key]);
      }
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    
    if ((name === 'reps' || name === 'approximateCalories') && (isNaN(value) || parseInt(value) < 0)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
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
      await axios.post('http://localhost:8070/exercises/add', formData);
      toast.success('Exercise added successfully!');
      setTimeout(() => navigate('/admin/dashboard/ExerciseList'), 1500);
    } catch (error) {
      console.error('Error adding exercise:', error);
      toast.error(error.response?.data?.message || 'Failed to add exercise');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({ label, name, type = 'text', required = false, placeholder, textarea = false, select = false, options = [] }) => (
    <div className={`mb-4 ${name === 'description' ? 'col-span-2' : ''}`}>
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
      ) : select ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 border-2 border-[#a07628] bg-[#f9f9e9] rounded-[14px] focus:outline-none ${
            errors[name] ? 'border-red-500' : ''
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          min={type === 'number' ? '1' : undefined}
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
        
        <h2 className="text-center text-4xl font-bold text-grey-500 mb-6">Add New Exercise</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Exercise Name" 
              name="exname" 
              required 
              placeholder="e.g. Push-ups" 
            />
            
            <FormField 
              label="Category" 
              name="category" 
              required 
              select 
              options={categories} 
            />
            
            <FormField 
              label="Repetitions" 
              name="reps" 
              type="number" 
              required 
              placeholder="e.g. 12" 
            />
            
            <FormField 
              label="Approximate Calories" 
              name="approximateCalories" 
              type="number" 
              required 
              placeholder="e.g. 100" 
            />
            
            <FormField 
              label="Image URL" 
              name="imageUrl" 
              placeholder="https://example.com/image.jpg" 
            />
            
            <FormField 
              label="Video URL" 
              name="videoUrl" 
              placeholder="https://youtube.com/example" 
            />
            
            <FormField 
              label="Description" 
              name="description" 
              required 
              textarea 
              placeholder="Detailed description of the exercise..." 
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard/ExerciseLis')}
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
              {isSubmitting ? 'Adding...' : 'Add Exercise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;