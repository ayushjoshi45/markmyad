"use client";

import shoes from "@/app/data/shoes";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Choose Your Sneaker
      </h1>

      {shoes.map((shoe) => (
        <div key={shoe.id} className="max-w-sm">
          <img
            src={shoe.previewImage}
            alt={shoe.name}
            className="w-full h-48 object-contain"
          />

          <h2 className="text-xl font-semibold mt-2">
            {shoe.name}
          </h2>

          <button
            onClick={() => router.push(`/customize/${shoe.id}`)}
            className="mt-2 bg-black text-white px-4 py-2 rounded"
          >
            Customize
          </button>
        </div>
      ))}
    </div>
  );
}
