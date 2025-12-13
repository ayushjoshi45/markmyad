"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Sneaker Studio</h1>

      <div className="flex gap-6">
        <Link href="/home">Home</Link>
        <Link href="/customize">Customize</Link>
        <Link href="/my-designs">My Designs</Link>
        <button onClick={logout} className="text-red-400">
          Logout
        </button>
      </div>
    </nav>
  );
}
