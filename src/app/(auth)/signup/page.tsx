"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Signup successful!");
    } else {
      toast.error(data.error || "Signup failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-96 p-6 bg-black border-1 border-white  rounded shadow">
        <h2 className="text-2xl font-bold text-white text-center">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded bg-white text-gray-700"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded bg-white text-gray-700"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded bg-white text-gray-700"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="w-full p-2 bg-white text-black rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
