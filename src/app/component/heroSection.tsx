import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="HeroSection" className="bg-[#C8E0E3] rounded-2xl p-8 my-8 flex flex-col md:flex-row items-center justify-around">
      {/* Left Text */}
      <div className="max-w-lg space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
          Create Your <br /> Dream Bouquets
        </h1>
        <p className="text-gray-700 font-medium">Unique is Beautiful</p>
        <a href="#ProductSection">
          <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            View catalogue
          </button>
        </a>
      </div>

      {/* Right Image */}
      <div className="relative mt-10 md:mt-0 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute w-full h-full bg-white rounded-full" />
        <Image
          src="/image/heroImage.png" // ganti dengan path gambar kamu
          alt="bouquet"
          width={300}
          height={300}
          className="relative z-10 object-right"
        />
        {/* Ornamen garis bisa ditambahkan di sini jika SVG atau PNG tersedia */}
      </div>
    </section>
  );
}
