"use client";

import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import { useRouter } from "next/navigation";

export default function Login() {
  // State to store email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vendor, setVendor] = useState(null); // Store vendor response data

  // Router for redirection
  const router = useRouter(); // Now useRouter is correctly imported

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make POST request to login API
      const response = await axios.post(
        "https://worldtriplink.com/vendors/vendorLogin",
        {
          email,
          password,
        }
      );

      // Get vendor data from response and store it
      const data = response.data;
      setVendor(data);

      // Store vendor data in localStorage
      localStorage.setItem("vendor", JSON.stringify(data));

      // Redirect to the home page (or any page of your choice)
      router.push("/"); // Redirect to the home page, you can change the route here

      // Optionally, log the response data
      console.log("Vendor login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Simple "Login Vendor" text */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-[-40px]">
        Login Vendor
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-5 mt-[-20px]"
      >
        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-6 flex items-center text-gray-500">
            <FaEnvelope className="mr-2" />
            <span>Email</span>
          </div>
          <input
            type="email"
            className="w-full pl-32 pr-5 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email on change
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-6 flex items-center text-gray-500">
            <FaLock className="mr-2" />
            <span>Password</span>
          </div>
          <input
            type="password"
            className="w-full pl-36 pr-5 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password on change
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none rounded-full shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
