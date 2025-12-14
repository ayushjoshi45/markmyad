"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import shoes from "@/app/data/shoes";
import ShoePreview from "@/app/components/ShoePreview";

export default function CustomizePage() {
  const { shoeId } = useParams();

  // Find selected shoe
  const shoe = shoes.find((s) => s.id === shoeId);

  // Color state
  const [colors, setColors] = useState({
    upper: "#f97316",
    sole: "#000000",
    logo: "#ffffff",
  });

  // Material state
  const [material, setMaterial] = useState("canvas");

  if (!shoe) {
    return <p className="p-6">Shoe not found</p>;
  }

  // Reusable color swatch row
  const ColorRow = ({ label, part }) => (
    <div>
      <p className="font-semibold mb-2 text-gray-800">
        {label}
      </p>
      <div className="flex gap-3 flex-wrap">
        {shoe.options.colors[part].map((color) => (
          <button
            key={color}
            onClick={() =>
              setColors((prev) => ({ ...prev, [part]: color }))
            }
            className={`w-8 h-8 rounded-full border-2 transition ${
              colors[part] === color
                ? "border-black scale-110"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            aria-label={`${label} ${color}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        Customize {shoe.name}
      </h1>

      {/* Preview */}
      <div className="border rounded-xl p-6 bg-gray-200 mb-10 flex justify-center">
        <ShoePreview
          shoe={shoe}
          colors={colors}
          material={material}
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Color Controls */}
        <div className="space-y-6">
          <ColorRow label="Upper Color" part="upper" />
          <ColorRow label="Sole Color" part="sole" />
          <ColorRow label="Logo Color" part="logo" />
        </div>

        {/* Material Selector */}
        <div>
          <label className="block font-semibold mb-2 text-gray-800">
            Material
          </label>

          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              rounded
              px-4
              py-2
              bg-white
              text-gray-900
              focus:outline-none
              focus:ring-2
              focus:ring-black
            "
          >
            {shoe.options.materials.map((mat) => (
              <option
                key={mat}
                value={mat}
                className="bg-white text-gray-900"
              >
                {mat.charAt(0).toUpperCase() + mat.slice(1)}
              </option>
            ))}
          </select>

          {/* Helper text */}
          <p className="text-sm text-gray-600 mt-2">
            {material === "canvas"
              ? "Canvas gives a matte, casual look"
              : "Leather gives a smooth, premium finish"}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-12">
        <button
          className="
            bg-black
            text-white
            px-8
            py-2
            rounded
            hover:bg-gray-900
            transition
          "
          onClick={() =>
            console.log({
              shoeId: shoe.id,
              colors,
              material,
            })
          }
        >
          Save Design
        </button>
      </div>
    </div>
  );
}
