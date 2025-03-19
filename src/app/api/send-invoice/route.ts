import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Recipient email is required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Billing Statement from Your Business",
      text: "Hello, here is your billing statement from Your Business. If you have any questions, contact us.",
      html: `<h2>Billing Statement</h2>
      <ul>
          <li><strong>Invoice No:</strong> INV-001</li>
          <li><strong>Date:</strong> ${new Date().toISOString().split("T")[0]}</li>
          <li><strong>Subtotal:</strong> $100.00</li>
          <li><strong>Tax:</strong> $5.00</li>
          <li><strong>Total:</strong> $105.00</li>
        </ul>`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Invoice sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Failed to send invoice." }, { status: 500 });
  }
}
