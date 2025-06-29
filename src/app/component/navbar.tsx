"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek session saat komponen dimount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkSession();
  }, []);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "#AboutSection" },
    { name: "Contacts", path: "#footer" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Refresh untuk update tampilan login/logout
  };

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-black bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-widest">
          <Image
            src="/logos/logo.png"
            alt="Logo"
            height={40}
            width={100}
            className="h-10"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium text-gray-400 hover:text-black`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Icon & Hamburger */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-black hover:text-red-600 text-sm"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <User className="w-5 h-5 text-black hover:text-green-700" />
            </Link>
          )}

          {/* Hamburger Menu - Mobile only */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col items-start px-6 pb-4 space-y-2 md:hidden">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium text-gray-400 hover:text-black`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
