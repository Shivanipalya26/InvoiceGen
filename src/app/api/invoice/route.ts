import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { recipient, items } = await req.json();

    if (!recipient || !items || items.length === 0) {
      return NextResponse.json({ message: "Recipient and items are required." }, { status: 400 });
    }

    const subTotal = items.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
    const tax = subTotal * 0.05; 
    const total = subTotal + tax;

    const invoice = await prisma.invoice.create({
      data: {
        recipient,
        subTotal,
        tax,
        total,
        user: { connect: { id: session.user.id } },
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

export async function GET(req: Request) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const invoices = await prisma.invoice.findMany({
        where: { userId: session.user.id },
        include: { items: true },
      });
  
      return NextResponse.json({ invoices }, { status: 200 });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return NextResponse.json({ message: "Failed to fetch invoices." }, { status: 500 });
    }
  }