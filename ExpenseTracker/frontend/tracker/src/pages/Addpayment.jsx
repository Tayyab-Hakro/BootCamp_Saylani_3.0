import React, { useState } from "react";
import axios from "axios";

function Addpayment() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(""); // income ya expense
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !type) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/payments/addpayment", {
        description,
        amount,
        balance: type, // backend me balance field ko fill karenge
      });

      if (response.data.success) {
        setMessage("Payment added successfully!");
        setDescription("");
        setAmount("");
        setType("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Payment</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <input
              type="text"
              placeholder="Enter payment description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === "income"}
                  onChange={(e) => setType(e.target.value)}
                  className="h-4 w-4"
                />
                <span>Income</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={type === "expense"}
                  onChange={(e) => setType(e.target.value)}
                  className="h-4 w-4"
                />
                <span>Expense</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
          >
            {loading ? "Adding..." : "Add Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addpayment;
