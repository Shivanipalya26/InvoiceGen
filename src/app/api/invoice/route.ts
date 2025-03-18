import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { recipient, items } = await req.json();

    if (!recipient || !items || items.length === 0) {
      return NextResponse.json({ message: "Recipient and items are required." }, { status: 400 });
    }

    // Calculate total values
    const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subTotal * 0.05; // Example: 5% tax
    const total = subTotal + tax;

    // Create invoice in database
    const invoice = await prisma.invoice.create({
      data: {
        recipient,
        subTotal,
        tax,
        total,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ message: "Invoice saved successfully!", invoice }, { status: 201 });
  } catch (error) {
    console.error("Error saving invoice:", error);
    return NextResponse.json({ message: "Failed to save invoice." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { items: true },
    });

    return NextResponse.json({ invoices }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch invoices." }, { status: 500 });
  }
}
