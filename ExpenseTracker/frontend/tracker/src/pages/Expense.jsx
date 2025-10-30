import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios';

function Expense() {
  const [IsExpense, SetIsExpense] = useState([])

  useEffect(() => {
    const GetExpense = async () => {
      const res = await axios.get("http://localhost:3000/api/payments/dashboard")
      console.log(res.data)
      if (res.status === 200) {
        let allpayments = res.data.payments.filter((item) => item.balance === "expense")
        SetIsExpense(allpayments)
        }
    }
    GetExpense()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">All Income Amounts</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold border-b">#</th>
              <th className="py-2 px-4 text-left font-semibold border-b">Description</th>
              <th className="py-2 px-4 text-left font-semibold border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {IsExpense.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b text-red-600 font-medium">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Expense
