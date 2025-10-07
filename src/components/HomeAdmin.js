"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, deleteObject } from "firebase/storage";

export default function HomeAdmin() {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  // Buscar notícias
  const fetchNoticias = async () => {
    setLoading(true);
    try {
      let q;
      try {
        q = query(collection(db, "posts"), orderBy("data", "desc")); // note que você tem "data" no Firestore
      } catch (err) {
        q = collection(db, "posts");
      }

      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNoticias(lista);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  // Filtrar notícias
  const noticiasFiltradas = noticias.filter(
    (n) =>
      (n.titulo || "").toLowerCase().includes(filtro.toLowerCase()) ||
      (n.id || "").toLowerCase().includes(filtro.toLowerCase())
  );

  // Deletar notícia
  const deletarNoticia = async (id, imagemUrl) => {
    if (!confirm("Deseja realmente deletar esta notícia?")) return;

    try {
      await deleteDoc(doc(db, "posts", id));

      if (imagemUrl) {
        try {
          const path = decodeURIComponent(imagemUrl.split("/o/")[1].split("?")[0]);
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
        } catch (err) {
          console.warn("Não foi possível deletar a imagem:", err.message);
        }
      }

      fetchNoticias();
    } catch (err) {
      console.error("Erro ao deletar notícia:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por título ou ID"
          className="border p-2 rounded w-full"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <button
        onClick={() => window.location.href = "/dashboard/nova-noticia"}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        + Nova Notícia
      </button>

      {loading ? (
        <p>Carregando notícias...</p>
      ) : noticiasFiltradas.length === 0 ? (
        <p>Nenhuma notícia encontrada.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Título</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticiasFiltradas.map((n) => (
              <tr
                key={n.id}
                className="even:bg-gray-100 odd:bg-white hover:bg-gray-200"
              >
                <td className="p-2 border text-gray-800 font-mono">{n.id}</td>
                <td className="p-2 border font-semibold text-gray-900">{n.titulo || "—"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => window.location.href = `/dashboard/editar/${n.id}`}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded font-medium transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarNoticia(n.id, n.imagem)}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-medium transition"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
