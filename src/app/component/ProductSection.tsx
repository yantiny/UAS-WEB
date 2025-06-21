import Image from "next/image";
import Link from "next/link";

// Utility formatter langsung di dalam file (bisa dipindah ke utils kalau ingin)
const formatRupiah = (number : number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const products = [
  {
    id: 1,
    name: "Lilium Rosa",
    description: "Elegant pink lily bouquet arrangement.",
    price: 59000,
    image: "/image/lilyPink.png",

  },
  {
    id: 2,
    name: "Viola Amor",
    description: "Charming purple garbera bouquet design.",
    price: 39000,
    image: "/image/garberaPurple.png",
  },
  {
    id: 3,
    name: "Ocean Bloom",
    description: "Elegant blue bouquet with premium wire.",
    price: 156000,
    image: "/image/blue.png",
  },
];

export default function ProductSection() {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-10 py-12">
      <div className="flex mt-15 bg-white">
        <div className="max-w-xs space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Best Selling Bouquets
          </h2>
          <p className="text-gray-500 text-sm">
            Easiest way to add beauty to your moments by picking your favorite
            bouquets
          </p>
          <Link href="/product">
            <button className="bg-[#C8E0E3] text-black px-4 py-2 rounded hover:bg-[#b0d3da]">
              See all <span className="ml-1">→</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Right Products */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {products.map((product) => (
          <div key={product.id} className="space-y-2">
            <div className="w-full h-72 relative rounded-xl overflow-hidden shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h3 className="text-sm font-semibold text-black">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-700 font-medium">
              {formatRupiah(product.price)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
