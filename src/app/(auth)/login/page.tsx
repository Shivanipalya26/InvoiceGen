"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard"); 
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-4 w-96 p-6 bg-black rounded shadow">
        <h2 className="text-2xl font-bold text-white text-center">Login</h2>

        <button
          onClick={() => signIn("google")}
          className="w-full p-2 bg-white text-black rounded hover:cursor-pointer"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full p-2 bg-white text-black rounded hover:cursor-pointer"
        >
          Sign in with GitHub
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded bg-white"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded bg-white"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {error && <p className="text-red-500">{`Invalid Credentials`}</p>}
          <button type="submit" className="w-full p-2 bg-white text-black rounded hover:cursor-pointer">
            Login with Email
          </button>
        </form>
      </div>
    </div>
  );
}
