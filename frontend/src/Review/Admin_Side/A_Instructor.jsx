import React, { useState, useEffect } from "react";
import axios from "axios";
import { generatePDF } from "../../components/utils/GeneratePDF";
import { IoMdDownload } from "react-icons/io";
import Navbar from "../../components/Navbar";

export default function A_Instructor() {
  const [others, setOthers] = useState([]);

  useEffect(() => {
    function getOthers() {
      axios
        .get("http://localhost:8070/Instruct_review/")
        .then((res) => {
          setOthers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getOthers();
  }, []);

  // Function to handle checkbox change
  const handleReviewBoxChange = (index) => {
    const updatedOthers = [...others];
    updatedOthers[index].selected = !updatedOthers[index].selected;
    setOthers(updatedOthers);
  };

  // Function to handle deleting a complaint
  const handleDeleteReview = (id) => {
    axios
      .delete(`http://localhost:8070/Instruct_review/delete/${id}`)
      .then((res) => {
        alert("Review deleted successfully");
        setOthers(others.filter((item) => item._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // PDF report function
  const downloadPDF = () => {
    const othersCount = others.length;
    const additionalInfo = `Total Reviews: ${othersCount}`;
    generatePDF(
      additionalInfo,
      ["name", "description", "stars"],
      others,
      "reviews-report"
    );
  };

  return (
    <div
      className="container mx-auto px-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114162.jpg')`,
      }}
    >
      <br></br>
      <h3 className="text-3xl font-bold mb-8 bg-gray-200 p-4 rounded-md text-center">
        Reviews - Instructors
      </h3>

      {/* Download PDF report */}
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-lg mb-8 flex items-center"
        onClick={downloadPDF}
      >
        <IoMdDownload className="mr-2" /> <span>Download Report</span>
      </button>

      {others.map((instructor, index) => (
        <div key={instructor._id} className="mb-8">
          <input
            type="checkbox"
            checked={instructor.selected || false}
            onChange={() => handleReviewBoxChange(index)}
            className="mr-4 transform scale-150"
          />
          <div
            className={`p-4 rounded-lg ${
              instructor.selected ? "bg-blue-100" : "bg-red-100"
            }`}
          >
            <div className="mb-2">
              <strong>Instructor's Name:</strong> {instructor.name}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {instructor.description}
            </div>
            <div className="mb-2">
              <strong>Rating:</strong> {instructor.stars}
            </div>
            <div className="mb-2">
              <strong>Rating Percentage:</strong> {instructor.percent}
            </div>
            <button
              onClick={() => handleDeleteReview(instructor._id)}
              className="bg-red-500 text-white py-1 px-2 rounded-lg"
            >
              Delete
            </button>
          </div>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
