import React, { useState, useEffect } from "react";
import axios from "axios";
import { generatePDF } from "../../components/utils/GeneratePDF";
import { IoMdDownload } from "react-icons/io";


export default function A_workout() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  // Function to fetch contacts
  function getContacts() {
    axios.get("http://localhost:8070/Workout_review/")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // Function to handle checkbox change
  const handleReviewBoxChange = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].selected = !updatedContacts[index].selected;
    setContacts(updatedContacts);
  };

  // Function to handle contact deletion
  const handleDeleteContact = (id) => {
    axios.delete(`http://localhost:8070/Workout_review/delete/${id}`)
      .then((res) => {
        alert("Review deleted successfully");
        // Filter out the deleted contact and update the state
        setContacts(contacts.filter((contact) => contact._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // PDF report function
  const downloadPDF = () => {
    const contactsCount = contacts.length;
    //
    const additionalInfo = `Total Reviews: ${contactsCount}`;
    //
    generatePDF(
      additionalInfo,
      ["category", "description", "stars"],
      contacts,
      "reviews-report"
    );
  };


  return (
    <div className="container mx-auto px-4"
    style={{
      backgroundImage: `url('https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114162.jpg')`,
    }}>
      <br />

      <h3 className="text-3xl font-bold mb-8 bg-gray-200 p-4 rounded-md text-center">Reviews - Workout Plans</h3>

      {/* Download PDF report */}
      <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg mb-8 flex items-center"
          onClick={downloadPDF}
        >
          <IoMdDownload className="mb-1" /> <span>Download Report</span>
        </button>


      {contacts.map((contact, index) => (
        <div key={contact._id} className="mb-8">
          <input
            type="checkbox"
            checked={contact.selected || false}
            onChange={() => handleReviewBoxChange(index)}
            className="mr-4 transform scale-150"
          />
          <div
            className={`p-4 rounded-lg ${contact.selected ? 'bg-blue-100' : 'bg-red-100'}`}
          >
            <div className="mb-2">
              <strong>Workout Category:</strong> {contact.category}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {contact.description}
            </div>
            <div className="mb-2">
              <strong>Rating:</strong> {contact.stars}
            </div>
            <div className="mb-2">
                    <strong>Rating Percentage:</strong> {contact.percent}
                  </div>
            <button
                onClick={() => handleDeleteReview(contact._id)}
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
