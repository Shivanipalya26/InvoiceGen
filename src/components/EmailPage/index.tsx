"use client";
import { useState } from "react";

const EmailInvoice = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendInvoiceEmail = async () => {
    if (!email) {
      setMessage("Please enter a recipient email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Send Invoice via Email</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={sendInvoiceEmail}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default EmailInvoice;
