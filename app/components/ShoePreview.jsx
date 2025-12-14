export default function ShoePreview({ shoe, colors }) {
  return (
    <div className="relative w-[350px] h-[200px] mx-auto">

      {/* Sole */}
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundColor: colors.sole,
          WebkitMaskImage: `url(${shoe.layers.sole})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: `url(${shoe.layers.sole})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      />

      {/* Upper */}
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundColor: colors.upper,
          WebkitMaskImage: `url(${shoe.layers.upper})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: `url(${shoe.layers.upper})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      />

      {/* Logo */}
      <div
        className="absolute inset-0 z-30 scale-90 top-4 left-15"
        style={{
          backgroundColor: colors.logo,
          WebkitMaskImage: `url(${shoe.layers.logo})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: `url(${shoe.layers.logo})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      />
    </div>
  );
}
