"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-extrabold text-xl tracking-wide">
          Sneaker<span className="text-orange-400">Studio</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/home"
            className="hover:text-orange-400 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/customize/1"
            className="hover:text-orange-400 transition-colors"
          >
            Customize
          </Link>

          <Link
            href="/my-designs"
            className="hover:text-orange-400 transition-colors"
          >
            My Designs
          </Link>

          <button
            onClick={logout}
            className="border border-red-500 text-red-400 px-4 py-1.5 rounded-lg
                       hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-4 space-y-4">
          <Link
            href="/home"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-orange-400"
          >
            Home
          </Link>

          <Link
            href="/customize/1"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-orange-400"
          >
            Customize
          </Link>

          <Link
            href="/my-designs"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-orange-400"
          >
            My Designs
          </Link>

          <button
            onClick={logout}
            className="block text-left text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
