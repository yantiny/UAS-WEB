"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    ukuran: "S",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `produk/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("bucket-storage")
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Gagal upload gambar");
        return;
      }

      const { data } = supabase.storage
        .from("bucket-storage")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("produk").insert([
      {
        nama_produk: form.nama_produk,
        deskripsi: form.deskripsi,
        harga: parseInt(form.harga),
        ukuran: form.ukuran,
        image_url: imageUrl,
      },
    ]);

    if (!error) {
      router.push("/products");
    } else {
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama_produk"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Nama Produk"
          required
        />
        <textarea
          name="deskripsi"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Deskripsi"
          required
        />
        <input
          name="harga"
          type="number"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Harga"
          required
        />
        <select
          name="ukuran"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Tambah
        </button>
      </form>
    </div>
  );
}
