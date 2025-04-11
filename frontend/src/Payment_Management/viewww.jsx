import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewCards = () => {
  const [others, setOthers] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCardNumber, setEditedCardNumber] = useState("");
  const [editedCVV, setEditedCVV] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State variable for search term
  const [isValidCardNumber, setIsValidCardNumber] = useState(true);
  const [isValidCVV, setIsValidCVV] = useState(true);

  useEffect(() => {
    function getOthers() {
      axios.get("http://localhost:8070/card")
        .then((res) => {
          setOthers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getOthers();
  }, []);

  // Function to handle deleting a card
  const handleDeleteCard = (id) => {
    axios.delete(`http://localhost:8070/card/delete/${id}`)
      .then((res) => {
        alert("Card deleted successfully");
        setOthers(others.filter((item) => item._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Function to handle opening edit area
  const handleOpenEditArea = (index) => {
    setEditIndex(index);
    setEditedDescription(others[index].cardName);
    setEditedCardNumber(others[index].cardNumber);
    setEditedCVV(others[index].cvvNumber);
  };

  // Function to handle updating the card
  const handleUpdateCard = (id, index) => {
    if (!isValidCardNumber || !isValidCVV) {
      alert("Please correct the errors before updating the card.");
      return;
    }

    axios.put(`http://localhost:8070/card/update/${id}`, { 
      cardName: editedDescription,
      cardNumber: editedCardNumber,
      cvvNumber: editedCVV
    })
      .then((res) => {
        alert("Card updated successfully");
        const updatedOthers = [...others];
        updatedOthers[index].cardName = editedDescription;
        updatedOthers[index].cardNumber = editedCardNumber;
        updatedOthers[index].cvvNumber = editedCVV;
        setOthers(updatedOthers);
        setEditIndex(null); // Close the edit area
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Function to handle canceling edit
  const handleCancelEdit = () => {
    setEditIndex(null); // Close the edit area
    setEditedDescription(""); // Clear the edited description
    setEditedCardNumber(""); // Clear the edited card number
    setEditedCVV(""); // Clear the edited CVV
    setIsValidCardNumber(true); // Reset validation state
    setIsValidCVV(true); // Reset validation state
  };

  const getRandomColor = () => {
    const colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#B5EAD7", "#C7CEEA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Filter cards based on search term 
  const filteredCards = others.filter(card =>
    card.cardName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Input change handlers with validation
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    setEditedCardNumber(input);
    setIsValidCardNumber(input.length === 12); // Validate card number length
  };

  const handleCvvChange = (e) => {
    const input = e.target.value;
    setEditedCVV(input);
    setIsValidCVV(input.length === 3); // Validate CVV number length
  };

  return (
    <>
      <Navbar/>
      <br></br>
      <br></br>
      <div>
        {/* search bar */}
        <div className="relative mx-auto font-bold flex justify-center mt-6 mb-4">
          <input
            className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[500px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* search end */}
      </div>
      <div style={{ margin: "50px" }}>
        <h3>Previous Cards</h3>
        {filteredCards.map((card, index) => (
          <div key={card._id} style={{ marginBottom: "30px" }}>
            <div
              style={{
                marginLeft: "200px",
                marginRight: "200px",
                backgroundColor: getRandomColor(),
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              <div style={{ marginBottom: "5px" }}>
                <strong>Card Name:</strong> 
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  card.cardName
                )}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>Card Number:</strong> 
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedCardNumber}
                    onChange={handleCardNumberChange} // Validation added
                  />
                ) : (
                  card.cardNumber
                )}
                {!isValidCardNumber && <p className="text-red-500 text-xs italic">Card number must be 12 digits</p>}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>Expire Date:</strong> {card.expiredate}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>CVV:</strong> 
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedCVV}
                    onChange={handleCvvChange} // Validation added
                  />
                ) : (
                  card.cvvNumber
                )}
                {!isValidCVV && <p className="text-red-500 text-xs italic">CVV must be 3 digits</p>}
              </div>
              <button onClick={() => handleDeleteCard(card._id)}
                style={{
                  backgroundColor: "#b2b6be",
                  border: "none",
                  borderRadius: "35%",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              {editIndex === index ? (
                <div>
                  <button
                    onClick={() => handleUpdateCard(card._id, index)}
                    style={{
                      backgroundColor: "#b2b6be",
                      border: "none",
                      borderRadius: "35%",
                      padding: "10px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      backgroundColor: "#b2b6be",
                      border: "none",
                      borderRadius: "35%",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleOpenEditArea(index)}
                  style={{
                    backgroundColor: "#b2b6be",
                    border: "none",
                    borderRadius: "35%",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCards;
