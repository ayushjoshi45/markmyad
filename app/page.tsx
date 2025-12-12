"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.user) {
        setEmail(data.user.email);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      {email ? (
        <h2>Welcome, {email}</h2>
      ) : (
        <p>Please login first.</p>
      )}
    </div>
  );
}
