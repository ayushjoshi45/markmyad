"use client";

import shoes from "@/app/data/shoes";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Design Your <br />
              <span className="text-orange-400">Dream Sneakers</span>
            </h1>

            <p className="mt-4 text-gray-300 max-w-md">
              Choose colors, materials, and styles.  
              Create sneakers that match your personality.
            </p>

            <button
              onClick={() => router.push(`/customize/${shoes[0].id}`)}
              className="mt-6 bg-orange-500 hover:bg-orange-600 
                         px-6 py-3 rounded-xl font-semibold transition"
            >
              Start Customizing
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={shoes[0].previewImage}
              alt="Sneaker Preview"
              className="w-[300px] md:w-[400px] drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Choose Your Base Model
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl 
                         transition-all duration-300 group overflow-hidden"
            >
              {/* Image */}
              <div className="bg-gray-100 h-52 flex items-center justify-center">
                <img
                  src={shoe.previewImage}
                  alt={shoe.name}
                  className="h-40 object-contain 
                             transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {shoe.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Fully customizable sneaker
                </p>

                <button
                  onClick={() => router.push(`/customize/${shoe.id}`)}
                  className="mt-4 w-full bg-black text-white py-2.5 
                             rounded-xl font-medium 
                             hover:bg-gray-800 transition"
                >
                  Customize Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-black text-white text-center py-12">
        <h3 className="text-2xl font-bold">
          Your Style. Your Rules.
        </h3>
        <p className="text-gray-400 mt-2">
          Save designs, edit later, and showcase your creativity.
        </p>
      </section>
    </div>
  );
}
