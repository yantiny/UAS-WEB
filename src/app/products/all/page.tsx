"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const fetchProduk = async () => {
      const { data } = await supabase.from("produk").select("*");
      setProduk(data || []);
    };
    fetchProduk();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect ke halaman login
  };

  const filteredProduk =
    selectedSize === "All"
      ? produk
      : produk.filter((p) => p.ukuran === selectedSize);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link
          href="/"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Kembali
        </Link>
      </div>

      {/* 🔽 Filter Ukuran */}
      <div className="mb-4">
        <label htmlFor="sizeFilter" className="mr-2 font-medium">
          Filter Ukuran:
        </label>
        <select
          id="sizeFilter"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">Semua</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>

      {/* 📦 Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProduk.length === 0 ? (
          <p className="text-gray-500 col-span-full">Tidak ada produk.</p>
        ) : (
          filteredProduk.map((p) => (
            <div key={p.id} className="border rounded p-4 shadow">
              <Image
                src={p.image_url}
                alt={p.nama_produk}
                className="rounded-xl w-full object-cover aspect-square mb-3"
                width={300}
                height={300}
              />
              <h2 className="font-semibold text-lg">{p.nama_produk}</h2>
              <p className="text-sm text-gray-500">{p.deskripsi}</p>
              <p className="text-green-700 font-bold">
                Rp {p.harga.toLocaleString()}
              </p>
              <p className="text-xs mt-1 text-gray-400">Size: {p.ukuran}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
