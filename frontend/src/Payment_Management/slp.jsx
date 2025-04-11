import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Slip = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission logic, such as uploading the file.
    if (file) {
      console.log("File uploaded:", file);
      // You can now upload the file to your server or perform any other necessary actions.
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url('https://img.freepik.com/free-photo/female-tourist-waiting-train_23-2147981865.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais')` }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="max-w-md mx-auto bg-white bg-opacity-75 shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Slip</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slipFile">
                  Upload Slip
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="slipFile"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button
                className="bg-[#44d658] text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slip;
