"use client";
import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EmailInvoice from "../EmailInvoice";
import { toast } from "react-toastify";

const Invoice = () => {
  const router = useRouter();
  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      number: "INV-001",
      date: new Date().toISOString().split("T")[0],
      sender: "",
      receiver: "",
      taxRate: 5,
      currency: "USD",
      items: [{ description: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: invoiceRef, documentTitle: watch("number") });

  const items = watch("items");
  const taxRate = watch("taxRate");
  const currency = watch("currency");

  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.quantity * item.price;
  });
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const currencySymbols: Record<string, string> = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
  const currencySymbol = currencySymbols[currency] || "$";

  const [loading, setLoading] = useState<boolean>(false);
  const [emailOpen, setEmailOpen] = useState(false); 

  const onSaveInvoice = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: data.receiver,
          subTotal: Number(subtotal),
          tax: Number(tax),
          total: Number(total),
          items: data.items.map((item: any) => ({
            name: item.description,
            quantity: Number(item.quantity),
            price: Number(item.price),
            total: Number(item.quantity) * Number(item.price),
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to save invoice");

      toast.success("Invoice saved successfully!");
      reset();  
    } catch (error) {
      console.error(error);
      toast.error("Error saving invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 p-10 mt-20">
        <Card className="p-6 w-full md:w-1/2 shadow">
          <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
          <form onSubmit={handleSubmit(onSaveInvoice)} className="space-y-4">
            <input {...register("number")} className="w-full p-2 border rounded" placeholder="Invoice Number" />
            <input type="date" {...register("date")} className="w-full p-2 border rounded" />
            <input {...register("sender")} className="w-full p-2 border rounded" placeholder="Who is this from?" />
            <input {...register("receiver")} className="w-full p-2 border rounded" placeholder="Bill to" />

            <div>
              <h3 className="font-bold mt-4">Currency</h3>
              <select {...register("currency")} className="p-2 border rounded w-full">
                {Object.entries(currencySymbols).map(([key, symbol]) => (
                  <option key={key} value={key}>
                    {symbol} {key}
                  </option>
                ))}
              </select>
            </div>

            <h3 className="mt-4 font-bold">Invoice Items</h3>
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <input {...register(`items.${index}.description`)} className="w-full p-2 border rounded" placeholder="Description" />
                <input type="number" {...register(`items.${index}.quantity`)} className="w-20 p-2 border rounded" placeholder="Qty" />
                <input type="number" {...register(`items.${index}.price`)} className="w-24 p-2 border rounded" placeholder="Price" />
                <Button variant="destructive" type="button" onClick={() => remove(index)}>
                  ✖
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ description: "", quantity: 1, price: 0 })}>
              + Add Item
            </Button>

            <div className="self-end text-right">
              <h3 className="font-bold">Tax Rate (%)</h3>
              <input
                type="number"
                {...register("taxRate", { valueAsNumber: true })}
                className="self-end w-26 p-2 border rounded"
                placeholder="Tax Rate"
                onChange={(e) => setValue("taxRate", parseFloat(e.target.value) || 0)}
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Saving..." : "Save Invoice"}
            </Button>
          </form>
        </Card>

        <Card className="p-6 w-full md:w-1/2 shadow">
          <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
          <div ref={invoiceRef} className=" p-4 rounded shadow">
            <p className="font-semibold">Invoice: {watch("number")}</p>
            <p className="text-gray-600 dark:text-white">Date: {watch("date")}</p>
            <p className="text-gray-600 dark:text-white">Sender: {watch("sender")}</p>
            <p className="text-gray-600 dark:text-white">Receiver: {watch("receiver")}</p>

            <table className="w-full mt-4 border">
              <thead>
                <tr className="">
                  <th className="p-2">Description</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-center">
                      {currencySymbol}
                      {item.price}
                    </td>
                    <td className="p-2 text-right">
                      {currencySymbol}
                      {(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <p>Subtotal: <strong>{currencySymbol}{subtotal.toFixed(2)}</strong></p>
              <p>Tax ({taxRate}%) : <strong>{currencySymbol}{tax.toFixed(2)}</strong></p>
              <p className="text-lg font-bold">Total: <strong>{currencySymbol}{total.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => handlePrint()} className="mt-4 mr-4">Download PDF</Button>
            <Button onClick={() => setEmailOpen(true)} className="mt-4">Send Mail</Button>
          </div>
        </Card>
      </div>
      <EmailInvoice
        recipient={watch("receiver")}
        total={total.toFixed(2)}
        open={emailOpen}
        setOpen={setEmailOpen}
      />
    </section>
  );
};

export default Invoice;
