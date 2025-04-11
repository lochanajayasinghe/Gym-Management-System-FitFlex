import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Salary() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [workDays, setWorkDays] = useState(0);
  const [salary, setSalary] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  useEffect(() => {
    // Fetch data or any other initialization logic
  }, []);

  function sendData(e) {
    e.preventDefault();

    let salary = 0;
    switch (position) {
      case "Website Developer":
        salary = workDays * 8000;
        break;
      case "Manager":
        salary = workDays * 10000;
        break;
      case "Senior Instructor":
        salary = workDays * 6000;
        break;
      case "Junior Instructor":
        salary = workDays * 4000;
        break;
      case "Minor Staff":
        salary = workDays * 2000;
        break;
      default:
        salary = 0;
    }

    const newSalary = {
      name: name,
      position: position,
      workDays: workDays,
      salary: salary,
      date: selectedDate,
    };

    axios
      .post("http://localhost:8090/Salary/add", newSalary)
      .then(() => {
        alert("Salary Data Added");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  const calculateMonthlyPayment = (position, workDays) => {
    let salary = 0;
    switch (position) {
      case "Website Developer":
        salary = workDays * 8000;
        break;
      case "Manager":
        salary = workDays * 10000;
        break;
      case "Senior Instructor":
        salary = workDays * 6000;
        break;
      case "Junior Instructor":
        salary = workDays * 4000;
        break;
      case "Minor Staff":
        salary = workDays * 2000;
        break;
      default:
        salary = 0;
    }
    return salary;
  };

  const handleWorkDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setWorkDays(value);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4 bg-gray-800 text-white p-4 mt-16">
          <h2 className="text-2xl mb-4">Employee Salary Details</h2>
        </div>
        <div className="w-3/4">
          <Navbar />
          <div>
            <br />
            <br />
          </div>

          <div
            className="contact_form mt-5 flex items-center justify-center bg-cover"
            style={{
              minHeight: "100vh",
              minWidth:"130vh",
              backgroundImage: `url('https://e1.pxfuel.com/desktop-wallpaper/679/684/desktop-wallpaper-back-muscle-muscle-back-the-horizontal-bar-workout-gym-gym-training-weight-bodybuilder-section-%D1%81%D0%BF%D0%BE%D1%80%D1%82-gym-fitness.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
              style={{
                border: "5px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 5)",
                maxWidth: "800px",
              }}
            >
              <form id="contact_form" onSubmit={sendData}>
                <div className="mb-4">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Employee's Name
                  </label>
                  <select
                    className="form-control rounded-md"
                    id="exampleFormControlInput1"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  >
                    <option value="">Select Employee's Name</option>
                    <option value="Samadi Wijethunga">Samadi Wijethunga</option>
                    <option value="Pulasthi Halangoda">Pulasthi Halangoda</option>
                    <option value="Chamika Adikari">Chamika Adikari</option>
                    <option value="Yashodara Athapattu">Yashodara Athapattu</option>
                    <option value="Parakrama Ekanayake">Parakrama Ekanayake</option>
                    <option value="Limeth Kurukulasooriya">Limeth Kurukulasooriya</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Employee's Post
                  </label>
                  <select
                    className="form-control rounded-md"
                    id="exampleFormControlInput1"
                    value={position}
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
                  >
                    <option value="">Select Employee's Post</option>
                    <option value="Website Developer">Website Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Senior Instructor">Senior Instructor</option>
                    <option value="Junior Instructor">Junior Instructor</option>
                    <option value="Minor Staff">Minor Staff</option>
                  </select>
                </div>

                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Working Days
                  </label>
                  <input
                    type="number"
                    className="form-control rounded-md"
                    value={workDays}
                    onChange={handleWorkDaysChange}
                    min={0}
                  />
                </div>

                <div className="mb-4 text-center">
                  <label htmlFor="datePicker" className="form-label">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="datePicker"
                    className="form-control rounded-md"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const selected = new Date(e.target.value);
                      if (selected >= new Date().setHours(0, 0, 0, 0)) {
                        setSelectedDate(selected);
                      }
                    }}
                  />
                </div>

                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlInput2" className="form-label">
                    Salary
                  </label>
                  <p>{calculateMonthlyPayment(position, workDays)}</p>
                </div>

                <div className="text-center"> {/* Centered div for the submit button */}
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
