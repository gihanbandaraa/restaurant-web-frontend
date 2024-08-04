import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavBar from "../pages/Admin/components/AdminNavBar";
import Footer from "../components/Footer";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AdminLayout = () => {
  console.log("AdminLayout: Rendering"); // Add console log for debugging

  return (
    <>
      <AdminNavBar />
      <main>
        <h1>Admin Layout Main Content</h1> {/* Simple JSX for testing */}
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          {/* Add more admin routes here */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
