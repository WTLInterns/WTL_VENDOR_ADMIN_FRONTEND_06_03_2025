
"use client";
import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { IndianRupee, Car, CalendarCheck, Users } from "lucide-react"; 
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const dataPie = [
    { name: "Desktop visit", value: 40, color: "#8884d8" },
    { name: "Tab visits", value: 30, color: "#FF4D4F" },
    { name: "Mobile visits", value: 30, color: "#4CAF50" },
  ];

  const dataLine = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 25 },
    { name: "Mar", value: 18 },
    { name: "Apr", value: 30 },
    { name: "May", value: 22 },
    { name: "Jun", value: 28 },
    { name: "Jul", value: 35 },
  ];

  const dataBar = [
    { name: "A", value: 15 },
    { name: "B", value: 25 },
    { name: "C", value: 10 },
    { name: "D", value: 30 },
    { name: "E", value: 20 },
    { name: "F", value: 25 },
    { name: "G", value: 18 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 bg-gray-100">
          
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Prices */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
              <IndianRupee className="w-10 h-10 text-green-500 mr-4" />
              <div>
                <p className="text-xl font-bold">₹ 0 /-</p>
                <p className="text-gray-500">Prices</p>
              </div>
            </div>

            {/* All Trips */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
              <Car className="w-10 h-10 text-blue-500 mr-4" />
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-gray-500">All Trips</p>
              </div>
            </div>

            {/* All Booking Details */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
              <CalendarCheck className="w-10 h-10 text-yellow-500 mr-4" />
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-gray-500">All Booking Details</p>
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
              <Users className="w-10 h-10 text-purple-500 mr-4" />
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-gray-500">Clients</p>
              </div>
            </div>
          </div>

          {/* Graphs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Pie Chart */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-center text-lg font-semibold mb-2">Visitor Statistics</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
                    {dataPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-blue-500 text-white shadow-lg p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Sales Growth</h2>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={dataLine}>
                  <XAxis dataKey="name" stroke="#FFF" />
                  <YAxis stroke="#FFF" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#FFF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-center text-lg font-semibold mb-2">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={dataBar}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8A4DFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
