import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function A_workout() {
  const [contacts, setContacts] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditedDescriptionValid, setIsEditedDescriptionValid] = useState(true); // State for edited description validation

  useEffect(() => {
    getContacts();
  }, []);

  function getContacts() {
    axios.get("http://localhost:8070/Workout_review/")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    // Check if the edited description meets the validation criteria
    setIsEditedDescriptionValid(editedDescription.trim().split(/\s+/).length > 5);
  }, [editedDescription]);

  const handleDeleteReview = (id) => {
    axios.delete(`http://localhost:8070/Workout_review/delete/${id}`)
      .then((res) => {
        alert("Contact deleted successfully");
        setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleOpenEditArea = (index) => {
    setEditIndex(index);
    setEditedDescription(contacts[index].description);
  };

  const handleUpdateReview = (id, index) => {
    // Validate the edited description before updating
    if (!isEditedDescriptionValid) {
      alert("Edited description must be at least 5 words");
      return;
    }

    axios.put(`http://localhost:8070/Workout_review/update/${id}`, { description: editedDescription })
      .then((res) => {
        alert("Review updated successfully");
        const updatedContacts = [...contacts];
        updatedContacts[index].description = editedDescription;
        setContacts(updatedContacts);
        setEditIndex(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedDescription("");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    
    <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-6 fixed h-full shadow-lg">
        
        <h2 className="text-2xl font-bold mb-20">Review Categories</h2>
        <ul className="space-y-4">
            <li>
              <Link 
                to="/show_I" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg"
              >
                Instructor Reviews
              </Link>
            </li>
            <li>
              <Link 
                to="/show_W" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg bg-gray-700"
              >
                Workout Reviews
              </Link>
            </li>
            <li>
              <Link 
                to="/show_P" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors text-lg"
              >
                Product Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Navbar />
          
        <div className="ml-64 flex-1">
          <div 
            className="bg-cover bg-center bg-no-repeat bg-fixed w-full min-h-screen"
            style={{
              backgroundImage: `url('https://wallpapercave.com/wp/wp4655609.jpg')`,
            }}
          >

          <div className="bg-black bg-opacity-50 w-full min-h-screen">
          <div className="container mx-auto px-6 py-12">
          <div className="pt-20"></div>

            <div className="m-10">
              <h3 className="text-3xl font-bold mb-8 bg-gray-200 p-4 rounded-md text-center" style={{ fontSize: '30px' }}>Reviews - Workout Plans</h3>
            <div className="relative mx-auto font-bold flex justify-center mb-4">
              <input
                type="text"
                placeholder="Search by workout category..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
              />
            </div>
            {filteredContacts.map((contact, index) => (
              <div key={contact._id} className="mb-5">
                <div className="bg-blue-200 rounded p-4 mb-2">
                  <strong>Workout Category:</strong> {contact.category}
                </div>
                <div
                  className={`bg-gray-100 rounded p-4 ${editIndex === index ? "bg-gray-200" : ""}`}
                >
                  <strong>Description:</strong>{" "}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full bg-white rounded border p-1 mb-2"
                    />
                  ) : (
                    contact.description
                  )}
                  <div className="mb-2">
                    <strong>Rating:</strong> {contact.stars}
                  </div>
                  <div className="mb-2">
                    <strong>Rating Percentage:</strong> {contact.percent}
                  </div>
                  <button
                    onClick={() => handleDeleteReview(contact._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => handleUpdateReview(contact._id, index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleOpenEditArea(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
