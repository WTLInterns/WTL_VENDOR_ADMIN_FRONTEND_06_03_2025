"use client";
import { useEffect, useState } from "react";
import { FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import React from "react";
import axios from "axios"; // Import axios

const Drivers = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    driverName: "",
    contactNo: "",
    altContactNo: "",
    address: "",
    dLNo: "",
    pvcNo: "",
    emailId: "",
    driverOtherDetails: "",
    driverImage: null,
    driverSelfie: null,
    dLnoImage: null,
    pvcImage: null,
    driverDoc1Image: null,
    driverDoc2Image: null,
    driverDoc3Image: null,
  });

  const vendor = JSON.parse(localStorage.getItem("vendor"));

  if (!vendor) {
    console.error("Vendor not found in localStorage");
    // Optionally handle the case when vendor is not found, like redirecting the user
  }

  const email = vendor ? vendor.email : null;
  const vendorId = vendor ? vendor.vendorId : null;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driverNameReges = /.+/;
    if (!driverNameReges.test(formData.driverName)) {
      alert("Driver name cannot be empty");
      return;
    }

    const addressReges = /.+/;
    if (!addressReges.test(formData.address)) {
      alert("Address cannot be empty");
      return;
    }

    const altContactNoRegex = /^[6-9]\d{9}$/;
    if (!altContactNoRegex.test(formData.altContactNo)) {
      alert("Contact no shoulde be greater than 9");
      return;
    }

    const contactNoRegex = /^[6-9]\d{9}$/;
    if (!contactNoRegex.test(formData.contactNo)) {
      alert("Alternate Contact no shoulde be greater than 9");

      return;
    }

    // // Validate Vehicle Number
    // const vehicleNoRegex = /^[A-Z]{2}\s*[0-9]{2}\s*[A-Z]{1,2}\s*[0-9]{4}$/;
    // if (!vehicleNoRegex.test(formData.vehicleNo)) {
    //   alert(
    //     "Please enter a valid Vehicle Number in Indian format (e.g., MH12AB1234)"
    //   );
    //   return;
    // }

    const dLNoRegex = /^[A-Z]{2}[0-9]{13}$/;
    if (!dLNoRegex.test(formData.dLNo)) {
      alert("Driver License are incorrect");

      return;
    }

    const form = new FormData();

    // Append text fields to form data
    Object.keys(formData).forEach((key) => {
      if (
        key !== "driverImage" &&
        key !== "driverSelfie" &&
        key !== "dLnoImage" &&
        key !== "pvcImage" &&
        key !== "driverDoc1Image" &&
        key !== "driverDoc2Image" &&
        key !== "driverDoc3Image"
      ) {
        form.append(key, formData[key]);
      }
    });

    // Append file fields to form data
    form.append("driverImage", formData.driverImage);
    form.append("driverSelfie", formData.driverSelfie);
    form.append("dLnoImage", formData.dLnoImage);
    form.append("pvcImage", formData.pvcImage);
    form.append("driverDoc1Image", formData.driverDoc1Image);
    form.append("driverDoc2Image", formData.driverDoc2Image);
    form.append("driverDoc3Image", formData.driverDoc3Image);

    try {
      const response = await axios.post(
        `http://localhost:8080/addVendorDriver/${vendorId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Vendor added successfully:", response.data);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        if (vendorId) {
          const response = await axios.get(
            `http://localhost:8080/${vendorId}/drivers`
          );
          setCabs(response.data); // Set fetched cabs data
        }
      } catch (error) {
        console.error("Error fetching cabs data:", error);
      }
    };

    fetchCabs(); // Call the fetch function
  }, [vendorId]);

  console.log(cabs);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 pt-20">
          {/* Header Section */}
          <div className="bg-gray-200 p-4 flex items-center justify-between rounded-lg shadow">
            <h2 className="font-semibold text-lg flex items-center">
              <span className="mr-2">👨‍✈️</span> All Drivers Details
            </h2>
            <button
              onClick={toggleForm}
              className="border p-3 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-white font-semibold transition duration-300 ease-in-out"
            >
              + Add Drivers
            </button>
          </div>

          {/* Modal for Adding Drivers */}
          {showForm && (
            <form onSubmit={handleSubmit}>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[80vh] overflow-y-auto">
                  {/* Close Button */}
                  <button
                    onClick={toggleForm}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
                  >
                    <FaTimes />
                  </button>

                  <h2 className="text-lg font-bold mb-2">Add Driver Form</h2>
                  <h3 className="text-md font-semibold mb-4">Add New Driver</h3>

                  {/* Driver Name */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      placeholder="Enter Driver Name"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Contact No.
                    </label>
                    <input
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      placeholder="Enter Contact No."
                      required
                    />
                  </div>

                  {/* Alternate Contact Number */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Alternate Contact No.
                    </label>
                    <input
                      type="text"
                      name="altContactNo"
                      value={formData.altContactNo}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      placeholder="Enter Alternate Contact No."
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      placeholder="Enter Address"
                      required
                    />
                  </div>

                  {/* Driver's Image & Selfie */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Driver's Image & Selfie
                    </label>
                    <input
                      type="file"
                      name="driverImage"
                      onChange={handleFileChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      required
                    />
                    <input
                      type="file"
                      name="driverSelfie"
                      onChange={handleFileChange}
                      className="border p-2 w-full md:w-2/3 rounded-md mt-2"
                      required
                    />
                  </div>

                  {/* Driver's License Number */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Driver's License No.
                    </label>
                    <input
                      type="text"
                      name="dLNo"
                      value={formData.dLNo}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-1/2 rounded-md"
                      placeholder="Enter DL No."
                      required
                    />
                    <input
                      type="file"
                      name="dLnoImage"
                      onChange={handleFileChange}
                      className="border p-2 w-full md:w-1/2 rounded-md md:ml-2 mt-2 md:mt-0"
                      required
                    />
                  </div>

                  {/* PVC Number */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      PVC Number
                    </label>
                    <input
                      type="text"
                      name="pvcNo"
                      value={formData.pvcNo}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-1/2 rounded-md"
                      placeholder="Enter PVC No."
                      required
                    />
                    <input
                      type="file"
                      name="pvcImage"
                      onChange={handleFileChange}
                      className="border p-2 w-full md:w-1/2 rounded-md md:ml-2 mt-2 md:mt-0"
                      required
                    />
                  </div>

                  {/* Additional Documents */}
                  {["Driver's Doc 1", "Driver's Doc 2", "Driver's Doc 3"].map(
                    (label, index) => (
                      <div
                        className="flex flex-col md:flex-row items-center mt-4"
                        key={index}
                      >
                        <label className="w-full md:w-1/3 mb-2 md:mb-0">
                          {label}
                        </label>
                        <input
                          type="file"
                          name={`driverDoc${index + 1}Image`}
                          onChange={handleFileChange}
                          className="border p-2 w-full md:w-2/3 rounded-md"
                          required
                        />
                      </div>
                    )
                  )}

                  {/* Additional Details */}
                  <div className="flex flex-col md:flex-row items-center mt-4">
                    <label className="w-full md:w-1/3 mb-2 md:mb-0">
                      Additional Details
                    </label>
                    <textarea
                      name="driverOtherDetails"
                      value={formData.driverOtherDetails}
                      onChange={handleInputChange}
                      className="border p-2 w-full md:w-2/3 rounded-md"
                      placeholder="Enter additional details"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Table Section */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Driver
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Driver Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Contact No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    DL. No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    PVC. No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email Id
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Address
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {cabs.length > 0 ? (
                  cabs.map((cab, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="border px-4 py-2">{cab.vendorDriverId}</td>
                      <td className="border px-4 py-2">{cab.driverName}</td>
                      <td className="border px-4 py-2">{cab.contactNo}</td>
                      <td className="border px-4 py-2">{cab.dLNo}</td>
                      <td className="border px-4 py-2">{cab.pvcNo}</td>
                      <td className="border px-4 py-2">{cab.emailId}</td>

                      <td className="border px-4 py-2">{cab.address}</td>

                      <td className="border px-4 py-2">
                        <button className="text-blue-500">
                          <FaArrowRight />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No cabs available.
                    </td>
                  </tr>
                )}
              </tbody>{" "}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
