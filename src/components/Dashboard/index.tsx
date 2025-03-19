'use client'
import { useEffect, useState } from "react";
import { Menu, BarChart, User, Settings, LogOut, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={toggleSidebar} className="text-white"><Menu /></button>
      </div>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"><BarChart /> <span>Analytics</span></a>
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"><User /> <span>Profile</span></a>
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"><Settings /> <span>Settings</span></a>
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 text-red-400"><LogOut /> <span>Logout</span></a>
      </nav>
    </div>
  );
};

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 600 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 }
  ];

  const pieData = [
    { name: "Paid", value: 60 },
    { name: "Pending", value: 30 },
    { name: "Overdue", value: 10 }
  ];

  const colors = ["#4CAF50", "#FF9800", "#F44336"];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoice");
        const data = await response.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="text-gray-600 md:hidden"><Menu /></button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button className="bg-blue-500 text-white flex items-center"><Plus className="mr-2" /> Create Invoice</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card><CardContent className="p-4">💰 Revenue: <strong>$15,000</strong></CardContent></Card>
          <Card><CardContent className="p-4">📊 Sales: <strong>350</strong></CardContent></Card>
          <Card><CardContent className="p-4">👥 Users: <strong>1,200</strong></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4">Invoice Statistics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">Recipient</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3">Tax</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t hover:bg-gray-100 transition">
                    <td className="p-3">{invoice.recipient}</td>
                    <td className="p-3">${invoice.subTotal.toFixed(2)}</td>
                    <td className="p-3">${invoice.tax.toFixed(2)}</td>
                    <td className="p-3 font-bold text-green-600">${invoice.total.toFixed(2)}</td>
                    <td className="p-3">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
