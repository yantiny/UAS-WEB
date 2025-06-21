"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductsPage() {
  const [produk, setProduk] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduk = async () => {
      const { data } = await supabase.from("produk").select("*");
      setProduk(data || []);
    };
    fetchProduk();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produk.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow">
            <h2 className="font-semibold text-lg">{p.nama_produk}</h2>
            <p className="text-sm text-gray-500">{p.deskripsi}</p>
            <p className="text-green-700 font-bold">
              Rp {p.harga.toLocaleString()}
            </p>
            <p className="text-xs mt-1 text-gray-400">Size: {p.ukuran}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
