"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState<number>(0);
  const [ukuran, setUkuran] = useState("S");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("produk")
      .insert([{ nama_produk: nama, deskripsi, harga, ukuran }]);

    if (error) {
      alert("Gagal menambahkan: " + error.message);
    } else {
      alert("Produk ditambahkan!");
      router.push("/products");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={ukuran}
          onChange={(e) => setUkuran(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}
