"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/signup", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black">
            Create <span className="text-orange-500">Account</span>
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Start designing your sneakers
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-800">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl mt-1
                       text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-800">
            Password
          </label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl mt-1
                       text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-700 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
