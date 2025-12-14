"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import shoes from "@/app/data/shoes";
import ShoePreview from "@/app/components/ShoePreview";

export default function CustomizePage() {
  const { shoeId } = useParams();
  const shoe = shoes.find((s) => s.id === shoeId);

  const [colors, setColors] = useState({
    upper: "#f97316",
    sole: "#000000",
    logo: "#ffffff",
  });

  const [material, setMaterial] = useState("canvas");
  const [saving, setSaving] = useState(false);

  /* 🔍 ZOOM STATE */
  const [zoom, setZoom] = useState(1);

  if (!shoe) {
    return <p className="p-6">Shoe not found</p>;
  }

  /* ---------- ZOOM CONTROLS ---------- */
  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.6));
  const resetZoom = () => setZoom(1);

  /* ---------- COLOR PICKER ---------- */
  const ColorRow = ({ label, part }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <p className="font-semibold mb-3 text-gray-900">{label}</p>

      <div className="flex gap-3 flex-wrap">
        {shoe.options.colors[part].map((color) => (
          <button
            key={color}
            onClick={() =>
              setColors((prev) => ({ ...prev, [part]: color }))
            }
            className={`w-9 h-9 rounded-full border-2 transition-all
              ${
                colors[part] === color
                  ? "border-black scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
            style={{ backgroundColor: color }}
            aria-label={`${label} ${color}`}
          />
        ))}
      </div>
    </div>
  );

  /* ---------- SAVE DESIGN ---------- */
  const saveDesign = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to save your design");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/designs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shoeId: shoe.id,
          colors,
          material,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("✅ Design saved successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Customize <span className="text-orange-500">{shoe.name}</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Choose colors and materials to create your sneaker
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* 🔍 PREVIEW WITH ZOOM */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">

            {/* ZOOM BUTTONS */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={zoomIn}
                className="bg-black text-white w-9 h-9 rounded-full hover:bg-gray-800"
                title="Zoom In"
              >
                +
              </button>

              <button
                onClick={zoomOut}
                className="bg-black text-white w-9 h-9 rounded-full hover:bg-gray-800"
                title="Zoom Out"
              >
                −
              </button>

              <button
                onClick={resetZoom}
                className="bg-gray-200 text-black w-9 h-9 rounded-full hover:bg-gray-300"
                title="Reset Zoom"
              >
                ⟳
              </button>
            </div>

            {/* PREVIEW CANVAS */}
            <div className="flex items-center justify-center h-[400px]">
              <div
                className="transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoom})` }}
                onWheel={(e) => {
                  if (e.deltaY < 0) zoomIn();
                  else zoomOut();
                }}
              >
                <ShoePreview
                  shoe={shoe}
                  colors={colors}
                  material={material}
                />
              </div>
            </div>
          </div>

          {/* 🎛️ CONTROLS */}
          <div className="space-y-6">
            <ColorRow label="Upper Color" part="upper" />
            <ColorRow label="Sole Color" part="sole" />
            <ColorRow label="Logo Color" part="logo" />

            {/* MATERIAL */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <label className="block font-semibold mb-2 text-gray-900">
                Material
              </label>

              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-black px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-black"
              >
                {shoe.options.materials.map((mat) => (
                  <option key={mat} value={mat} className="text-black">
                    {mat.charAt(0).toUpperCase() + mat.slice(1)}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-600 mt-2">
                {material === "canvas"
                  ? "Canvas gives a matte, casual look"
                  : "Leather gives a smooth, premium finish"}
              </p>
            </div>

            {/* SAVE */}
            <button
              onClick={saveDesign}
              disabled={saving}
              className={`w-full py-3 rounded-xl font-semibold text-white
                ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900"
                } transition`}
            >
              {saving ? "Saving..." : "Save Design"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
