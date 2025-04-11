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

// ProductRating component
const ProductRating = () => {
  const [categoryRatings, setCategoryRatings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/Product_review/")
      .then((res) => {
        const productReviews = res.data;

        // Initialize category ratings
        const categoryRatingsMap = {
          Clothing: { totalStars: 0, count: 0 },
          Proteins: { totalStars: 0, count: 0 },
          "Gym-Equipments": { totalStars: 0, count: 0 },
        };

        // Calculate total stars for each category
        productReviews.forEach((review) => {
          const category = review.type;
          const stars = review.stars.length / 2; // Divide by 2 to convert from emojis to stars
          categoryRatingsMap[category].totalStars += stars;
          categoryRatingsMap[category].count++;
        });

        // Calculate average rating for each category
        const avgRatings = Object.keys(categoryRatingsMap).map((category) => ({
          category: category,
          avgRating: categoryRatingsMap[category].totalStars / categoryRatingsMap[category].count,
        }));

        setCategoryRatings(avgRatings);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
     
     
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product Category Ratings</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={categoryRatings}
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

export default ProductRating;
