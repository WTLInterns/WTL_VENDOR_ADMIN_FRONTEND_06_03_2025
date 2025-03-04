// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

// export default function Home() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64">
//         <Navbar />
     
//         <main className="p-6 pt-20">{children}</main>
//       </div>
//     </div>
//   );
// }


import Dashboard from "./Dashboard/page"; // ✅ Import Dashboard
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main className="p-6 pt-20">
          <Dashboard />  {/* ✅ Now rendering Dashboard correctly */}
        </main>
      </div>
    </div>
  );
}
