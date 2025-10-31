import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Addpayment from "./pages/Addpayment";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Income from "./pages/Income";
import Expense from "./pages/Expense";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isAuthPage = location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {token && !isAuthPage && <Sidebar />}

      <div className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={token ? <Dashboard /> : <Register />}
          />
          <Route
            path="/add-payment"
            element={token ? <Addpayment /> : <Register />}
          />
          <Route
            path="/income"
            element={token ? <Income /> : <Register />}
          />
          <Route
            path="/expense"
            element={token ? <Expense /> : <Register />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
