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

const InstructorRating = () => {
  const [instructorRatings, setInstructorRatings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/Instruct_review/")
      .then((res) => {
        const instructorReviews = res.data;

        // Initialize instructor ratings
        const instructorRatingsMap = {
          Wijethunga: { totalStars: 0, count: 0 },
          Adikari: { totalStars: 0, count: 0 },
          Ekanayake: { totalStars: 0, count: 0 },
          Athapattu: { totalStars: 0, count: 0 },
        };

        // Calculate total stars for each instructor
        instructorReviews.forEach((review) => {
          const stars = review.stars.length / 2; // Divide by 2 to convert from emojis to stars
          instructorRatingsMap[review.name].totalStars += stars;
          instructorRatingsMap[review.name].count++;
        });

        // Calculate average rating for each instructor
        const avgRatings = Object.keys(instructorRatingsMap).map((instructor) => ({
          instructor: instructor,
          avgRating: instructorRatingsMap[instructor].totalStars / instructorRatingsMap[instructor].count,
        }));

        setInstructorRatings(avgRatings);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
        
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Instructor Ratings</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={instructorRatings}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="instructor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default InstructorRating;
