'use client'
import React, { useState } from "react";

export default function editarPost({ params }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    chamadaNoticia: '',
    imagem: '',
    post: '',
    autor: '',
    tags: '',
    destaque: ''
  });

  const handleUpdate = async () => {
    // Pego os valores do meu form e removo campos em branco
    const camposPreenchidos = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    try {
      const responseUpdated = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camposPreenchidos)
      });

      if (!responseUpdated.ok) {
        throw new Error("Postagem não atualizada");
      }
    }
    catch (err) {
      return err;
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Editar Post {id}
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Subtítulo"
            value={formData.subtitulo}
            onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Chamada da Notícia"
            value={formData.chamadaNoticia}
            onChange={(e) => setFormData({ ...formData, chamadaNoticia: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="URL da Imagem"
            value={formData.imagem}
            onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <textarea
            placeholder="Conteúdo do post"
            value={formData.post}
            onChange={(e) => setFormData({ ...formData, post: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
          />

          <input
            type="text"
            placeholder="Autor"
            value={formData.autor}
            onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Tags (separadas por vírgula)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Destaque (true/false)"
            value={formData.destaque}
            onChange={(e) => setFormData({ ...formData, destaque: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}