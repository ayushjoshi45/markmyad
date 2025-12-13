"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Brand */}
        <h1 className="text-3xl font-extrabold text-black text-center">
          Sneaker Studio
        </h1>
        <p className="text-black text-center text-sm mt-2 mb-8">
          Design sneakers your way
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <label className="text-sm font-semibold text-black">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="text-sm font-semibold text-black">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-sm text-black text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
