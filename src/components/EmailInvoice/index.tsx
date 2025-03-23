"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EmailInvoiceProps {
  recipient: string;
  total: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}

const EmailInvoice: React.FC<EmailInvoiceProps> = ({ recipient, total, open, setOpen }) => {
  const [email, setEmail] = useState(recipient);
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
        body: JSON.stringify({ email, total }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to send email.");
    } finally {
      setLoading(false);
      setTimeout(() => setOpen(false), 2000); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) setMessage(""); 
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Invoice via Email</DialogTitle>
        </DialogHeader>

        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <p className="text-gray-600 dark:text-white">Invoice Total: <strong>${total}</strong></p>

        <Button onClick={sendInvoiceEmail} className="w-full mt-2" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </Button>

        {message && <p className="mt-2 text-gray-600 dark:text-white text-center">{message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default EmailInvoice;
