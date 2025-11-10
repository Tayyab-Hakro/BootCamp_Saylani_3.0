import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Landmark,
  ArrowDownCircle,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem(""); 
    setUser(null);
    alert("User logged out successfully");
    navigate("/register"); 
  };

  const getUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/user/getprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      localStorage.removeItem("token"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <aside className="flex flex-col flex-shrink-0 w-64 p-4 m-2 bg-white rounded-lg shadow-lg lg:m-4">
      {/* Profile Section */}
      <div className="flex items-center gap-3 p-4 pb-6 mb-6 border-b border-gray-200">
        <img
          src={
            user?.image
              ? `http://localhost:3000/uploads/${user.image}`
              : "https://placehold.co/40x40/6366f1/white?text=MW"
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {user?.name || "Guest"}
          </h3>
          <span className="text-sm text-gray-500">
            {user ? "View Profile" : "Not logged in"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3 text-gray-600 rounded-lg hover:bg-gray-100">
          <LayoutDashboard size={20} />
          <Link to={"/"}>
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 p-3 text-gray-600 rounded-lg hover:bg-gray-100">
          <Landmark size={20} />
          <Link to={"/income"}>
            <span>Income</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 p-3 text-gray-600 rounded-lg hover:bg-gray-100">
          <ArrowDownCircle size={20} />
        <Link to={"/expense"}> <span>Expense</span></Link >
        </div>

        <div className="flex items-center gap-3 p-3 text-gray-600 rounded-lg hover:bg-gray-100">
          <ArrowDownCircle size={20} />
          <Link to={"/add-payment"}>
            <span>Add Payments</span>
          </Link>
        </div>

        <div
          onClick={user ? handleLogout : () => navigate("/register")}
          className={`flex items-center gap-3 p-3 rounded-lg mt-6 cursor-pointer ${
            user
              ? "text-red-500 hover:bg-red-50"
              : "text-green-600 hover:bg-green-50"
          }`}
        >
          <LogOut size={20} />
          <span>{user ? "Logout" : "Sign In / Sign Up"}</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
