import { Package, PhoneCall, Leaf } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-16 text-center">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-black">About us</h2>
        <p className="text-gray-600 mt-2">
          Order now and appreciate the beauty of nature
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Feature 1 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#C8E0E3] p-4 rounded-full">
            <Leaf size={32} className="text-black" />
          </div>
          <h3 className="font-semibold text-black">Large Assortment</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            we offer many different types of products with fewer variations in
            each category.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#C8E0E3] p-4 rounded-full">
            <Package size={32} className="text-black" />
          </div>
          <h3 className="font-semibold text-black">Fast & Free Shipping</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            4-day or less delivery time, free shipping and an expedited delivery
            option.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#C8E0E3] p-4 rounded-full">
            <PhoneCall size={32} className="text-black" />
          </div>
          <h3 className="font-semibold text-black">24/7 Support</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            answers to any business related inquiry 24/7 and in real-time.
          </p>
        </div>
      </div>
    </section>
  );
}
