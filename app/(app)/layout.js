"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
}
