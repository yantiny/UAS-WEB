"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      }
    };

    checkSession();
  }, []);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-5">All Products</h1>
          <Link
            href="/products/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Tambah
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {produk.map((p) => (
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
            <div className="flex justify-between mt-3">
              <button
                onClick={() => router.push(`/products/edit/${p.id}`)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  const confirm = window.confirm(
                    "Yakin ingin menghapus produk?"
                  );
                  if (confirm) {
                    await supabase.from("produk").delete().eq("id", p.id);
                    setProduk((prev) =>
                      prev.filter((item) => item.id !== p.id)
                    );
                  }
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
