const shoes = [
  {
    id: "1",
    name: "Basic Sneaker",

    previewImage: "/images/nike-shoes/preview.webp",

    layers: {
      upper: "/images/nike-shoes/upper.png",
      sole: "/images/nike-shoes/sole.png",
      logo: "/images/nike-shoes/logoy.svg",
    },

    customizableParts: ["upper", "sole", "logo"],

    options: {
      colors: {
        upper: [
          "#f97316", // orange
          "#ffffff",
          "#000000",
          "#ef4444", // red
          "#1d4ed8", // blue
          "#22c55e", // green
          "#a855f7", // purple
        ],
        sole: [
          "#000000",
          "#ffffff",
          "#9ca3af", // gray
          "#e5e7eb", // light gray
        ],
        logo: [
          "#000000",
          "#ffffff",
          "#ef4444",
          "#1d4ed8",
          "#22c55e",
        ],
      },

      materials: ["canvas", "leather"],
    },
  },
];

export default shoes;
