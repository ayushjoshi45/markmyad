"use client";

import { useEffect, useState } from "react";
import shoes from "@/app/data/shoes";
import { useRouter } from "next/navigation";
import ShoePreview from "@/app/components/ShoePreview";

export default function MyDesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDesigns = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/designs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setDesigns(data.designs);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [router]);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your designs...
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-gray-900">
          My Designs
        </h1>
        <p className="text-gray-600 mt-2">
          You haven’t saved any designs yet.
        </p>

        <button
          onClick={() => router.push("/home")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition"
        >
          Start Designing
        </button>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Designs
            </h1>
            <p className="text-gray-600">
              Your saved sneaker creations
            </p>
          </div>

          <button
            onClick={() => router.push("/customize/1")}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            + New Design
          </button>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {designs.map((design) => {
            const shoe = shoes.find(
              (s) => s.id === design.shoeId
            );

            if (!shoe) return null;

            return (
              <div
                key={design._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl 
                           transition-all duration-300 group overflow-hidden"
              >
                {/* Preview */}
                <div className="bg-gray-100 p-4 flex justify-center">
                  <div className="scale-75 origin-top">
                    <ShoePreview
                      shoe={shoe}
                      colors={design.colors}
                      material={design.material}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-semibold text-lg text-gray-900">
                    {shoe.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Material:{" "}
                    <span className="capitalize">
                      {design.material}
                    </span>
                  </p>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mt-3">
                    {Object.values(design.colors).map(
                      (color, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-5">
                    <button
                      onClick={() =>
                        router.push(
                          `/customize/${design.shoeId}?designId=${design._id}`
                        )
                      }
                      className="text-sm font-medium text-black hover:underline"
                    >
                      Edit Design
                    </button>

                    <span className="text-xs text-gray-400">
                      Saved
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
