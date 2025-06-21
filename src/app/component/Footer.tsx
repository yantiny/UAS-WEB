import { Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#C8E0E3] text-black px-6 md:px-16 py-12 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <h2 className="text-xl font-semibold tracking-wide mb-2">
            <Image
              src="/logos/logo.png"
              alt="Logo"
              height={40}
              width={100}
              className="h-10 mb-2"
            />
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            We help you find your dream plant
          </p>
          <div className="flex gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+6283125400242"
              aria-label="WhatsApp"
              className="hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.133-.132.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.611-.916-2.2-.242-.579-.487-.501-.67-.51-.173-.007-.372-.009-.571-.009s-.521.075-.793.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.007-1.41.248-.694.248-1.289.173-1.41-.074-.123-.272-.198-.57-.347z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/balimoon.a" aria-label="Instagram" className="hover:text-gray-900">
              <Instagram size={20} />
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@balimoon.a" aria-label="TikTok" className="hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 8.245v-.245a6.021 6.021 0 01-2-.383V15a5 5 0 11-5-5 4.97 4.97 0 012.071.452A2.983 2.983 0 0010 12a3 3 0 103 3V3h2a4 4 0 004 4v1h-3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 className="font-semibold mb-2">Information</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
            <li>
              <a href="#">Our story</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>
              <a href="#">Getting Started</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-sm text-gray-600">
        2025 all Right Reserved Term of use BALIMOON.A
      </div>
    </footer>
  );
}
