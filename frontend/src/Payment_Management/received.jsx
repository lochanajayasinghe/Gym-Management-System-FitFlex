import React, { useState } from "react";

const ReceivedSlips = () => {
  const [receivedSlips, setReceivedSlips] = useState([
    {
      id: 1,
      slipNumber: "SLP001",
      amount: 1000,
      sender: "John Doe",
      status: "Pending",
    },
    {
      id: 2,
      slipNumber: "SLP002",
      amount: 1500,
      sender: "Jane Smith",
      status: "Pending",
    },
    {
      id: 3,
      slipNumber: "SLP003",
      amount: 2000,
      sender: "Alice Johnson",
      status: "Pending",
    },
    {
      id: 4,
      slipNumber: "SLP004",
      amount: 1200,
      sender: "Mike Brown",
      status: "Pending",
    },
    {
      id: 5,
      slipNumber: "SLP005",
      amount: 1800,
      sender: "Emily Davis",
      status: "Pending",
    },
    {
      id: 6,
      slipNumber: "SLP006",
      amount: 2200,
      sender: "David Wilson",
      status: "Pending",
    },
  ]);

  const [report, setReport] = useState({ accepted: 0, rejected: 0 });

  const acceptSlip = (id) => {
    setReceivedSlips((prevSlips) =>
      prevSlips.map((slip) =>
        slip.id === id ? { ...slip, status: "Accepted" } : slip
      )
    );
  };

  const rejectSlip = (id) => {
    setReceivedSlips((prevSlips) =>
      prevSlips.map((slip) =>
        slip.id === id ? { ...slip, status: "Rejected" } : slip
      )
    );
  };

  const viewSlip = (slip) => {
    console.log("View slip details:", slip);
  };

  const getReport = () => {
    const acceptedCount = receivedSlips.filter((slip) => slip.status === "Accepted").length;
    const rejectedCount = receivedSlips.filter((slip) => slip.status === "Rejected").length;
    setReport({ accepted: acceptedCount, rejected: rejectedCount });
  };

  return (
    
    <div className="contact_form mt-5 flex items-center justify-center bg-cover"
      style={{
        minHeight: '100vh',
        minWidth: '180vh',
        backgroundImage: `url('https://images.hdqwalls.com/wallpapers/dwayne-johnson-in-gym-4k-kf.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      <div className="max-w-[400px] w-full">
        {receivedSlips.map((slip) => (
          <div
            key={slip.id}
            className="bg-white rounded-lg shadow-md mb-4 p-4"
          >
            <div className="mb-2">
              <span className="text-gray-600 font-semibold">Slip Number: </span>
              <span>{slip.slipNumber}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600 font-semibold">Amount: </span>
              <span>${slip.amount}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600 font-semibold">Sender: </span>
              <span>{slip.sender}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600 font-semibold">Status: </span>
              <span>{slip.status}</span>
            </div>
            <button
              onClick={() => acceptSlip(slip.id)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => rejectSlip(slip.id)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Reject
            </button>
            <button
              onClick={() => viewSlip(slip)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              View Slip
            </button>
          </div>
        ))}
        <button
          onClick={getReport}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Get The Report
        </button>
        <div className="mt-4">
  <p className="text-white font-semibold">Accepted Slips: {report.accepted}</p>
  <p className="text-white font-semibold">Rejected Slips: {report.rejected}</p>
</div>

      </div>
    </div>
  );
};

export default ReceivedSlips;