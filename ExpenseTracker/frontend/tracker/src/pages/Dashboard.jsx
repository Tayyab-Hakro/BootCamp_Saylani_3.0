import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, Banknote, CreditCard, MoreHorizontal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF8042', '#FF0000'];
const BALANCE_COLOR = '#8884d8';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export default function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/payments/dashboard');
        if (res.data.success) {
          setPayments(res.data.payments);
          setSummary({
            totalIncome: res.data.totalIncome,
            totalExpenses: res.data.totalExpense,
            totalBalance: res.data.totalBalance,
          });
          console.log(res.data)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = [
    { name: 'Total Income', value: summary.totalIncome },
    { name: 'Total Expenses', value: summary.totalExpenses },
  ];
  const innerChartData = [{ name: 'Total Balance', value: summary.totalBalance }];

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Wallet size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Balance</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.totalBalance)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 rounded-full bg-orange-100 text-orange-600">
            <Banknote size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.totalIncome)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.totalExpenses)}</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transactions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <button className="text-gray-500 hover:text-gray-800">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {payments.map((tx) => (
              <div key={tx._id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div>
                  <h4 className="font-semibold text-gray-700">{tx.description}</h4>
 {tx.Date ? new Date(tx.Date).toLocaleDateString() : "No date"}
                </div>
                <span
                  className={`font-semibold ${tx.balance === 'expense' ? 'text-red-500' : 'text-green-500'}`}
                >
                  {tx.balance === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 self-start">Financial Overview</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(value, name) => [formatCurrency(value), name]} />
                <Pie data={innerChartData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={50} fill={BALANCE_COLOR} />
                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
