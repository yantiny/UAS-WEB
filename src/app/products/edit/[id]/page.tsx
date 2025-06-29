"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    ukuran: "S",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("produk")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setForm({
          nama_produk: data.nama_produk,
          deskripsi: data.deskripsi,
          harga: data.harga.toString(),
          ukuran: data.ukuran,
          image_url: data.image_url,
        });
        setImagePreview(data.image_url);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = form.image_url;

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

    const { error } = await supabase
      .from("produk")
      .update({
        nama_produk: form.nama_produk,
        deskripsi: form.deskripsi,
        harga: parseInt(form.harga),
        ukuran: form.ukuran,
        image_url: imageUrl,
      })
      .eq("id", id);

    if (!error) {
      router.push("/products");
    } else {
      alert("Gagal update produk");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="nama_produk"
          value={form.nama_produk}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Nama Produk"
          required
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Deskripsi"
          required
        />
        <input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Harga"
          required
        />
        <select
          name="ukuran"
          value={form.ukuran}
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
        />
        {imagePreview && (
          // Untuk preview blob/gambar lokal, gunakan <img> biasa
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full rounded-md mt-2"
            width={300}
            height={300}
          />
        )}
        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
