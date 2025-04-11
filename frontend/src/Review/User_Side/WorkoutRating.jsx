import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// WorkoutRating component
const WorkoutRating = () => {
  const [workoutRatings, setWorkoutRatings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/Workout_review/")
      .then((res) => {
        const workoutReviews = res.data;

        // Initialize workout ratings
        const workoutRatingsMap = {
          "Beginner level Workout Plans": { totalStars: 0, count: 0 },
          "Intermediate level Workout Plans": { totalStars: 0, count: 0 },
          "Advance level Workout Plans": { totalStars: 0, count: 0 },
        };

        // Calculate total stars for each workout category
        workoutReviews.forEach((review) => {
          const category = review.category;
          const stars = review.stars.length / 2; // Divide by 2 to convert from emojis to stars
          workoutRatingsMap[category].totalStars += stars;
          workoutRatingsMap[category].count++;
        });

        // Calculate average rating for each workout category
        const avgRatings = Object.keys(workoutRatingsMap).map((category) => ({
          category: category,
          avgRating: workoutRatingsMap[category].totalStars / workoutRatingsMap[category].count,
        }));

        setWorkoutRatings(avgRatings);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
     
       
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Workout Category Ratings</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={workoutRatings}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default WorkoutRating;
