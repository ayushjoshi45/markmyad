"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import shoes from "@/app/data/shoes";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  /* SEARCH */
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [results, setResults] = useState([]);

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  /* DEBOUNCE */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  /* FILTER */
  useEffect(() => {
    if (!debouncedText.trim()) {
      setResults([]);
      return;
    }

    setResults(
      shoes.filter((shoe) =>
        shoe.name.toLowerCase().includes(debouncedText.toLowerCase())
      )
    );
  }, [debouncedText]);

  const goToCustomize = (id) => {
    setSearchText("");
    setResults([]);
    router.push(`/customize/${id}`);
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* NAVBAR GLASS */}
      <div className="bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-6">

          {/* LOGO */}
          <h1 className="font-extrabold text-xl tracking-wide text-white">
            Sneaker<span className="text-orange-400">Studio</span>
          </h1>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:block relative w-80">
            <input
              type="text"
              placeholder="Search sneakers..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/90 text-black
                         placeholder-gray-500 focus:outline-none
                         focus:ring-2 focus:ring-orange-400"
            />

            {results.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden">
                {results.map((shoe) => (
                  <button
                    key={shoe.id}
                    onClick={() => goToCustomize(shoe.id)}
                    className="w-full text-left px-4 py-2 text-black
                               hover:bg-gray-100 transition"
                  >
                    {shoe.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <Link href="/home" className="hover:text-orange-400 transition">
              Home
            </Link>

            <Link href="/customize/1" className="hover:text-orange-400 transition">
              Customize
            </Link>

            <Link href="/my-designs" className="hover:text-orange-400 transition">
              My Designs
            </Link>

            <button
              onClick={logout}
              className="px-4 py-1.5 rounded-lg border border-red-500
                         text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur border-b border-white/10 px-4 py-4 space-y-4">

          {/* MOBILE SEARCH */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search sneakers..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white text-black"
            />

            {results.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl">
                {results.map((shoe) => (
                  <button
                    key={shoe.id}
                    onClick={() => {
                      setMenuOpen(false);
                      goToCustomize(shoe.id);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    {shoe.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/customize/1" onClick={() => setMenuOpen(false)}>
            Customize
          </Link>

          <Link href="/my-designs" onClick={() => setMenuOpen(false)}>
            My Designs
          </Link>

          <button
            onClick={logout}
            className="text-left text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
