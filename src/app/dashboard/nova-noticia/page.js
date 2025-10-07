"use client";

import { useState } from "react";

export default function NovaNoticia() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [chamadaNoticia, setChamadaNoticia] = useState("");
  const [post, setPost] = useState("");
  const [autor, setAutor] = useState("Marcelo Henrique");
  const [tags, setTags] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [imagem, setImagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          subtitulo,
          chamadaNoticia,
          post,
          autor,
          tags: tags.split(",").map(t => t.trim()),
          destaque,
          imagem,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Notícia criada com sucesso!");
        window.location.href = "/dashboard";
      } else {
        alert("Erro: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao criar notícia.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nova Notícia</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Subtítulo"
          value={subtitulo}
          onChange={e => setSubtitulo(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Chamada da notícia"
          value={chamadaNoticia}
          onChange={e => setChamadaNoticia(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Conteúdo da notícia"
          value={post}
          onChange={e => setPost(e.target.value)}
          className="border p-2 rounded w-full"
          rows={6}
        />
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Link da imagem"
          value={imagem}
          onChange={e => setImagem(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={destaque}
            onChange={e => setDestaque(e.target.checked)}
          />
          <span>Destaque</span>
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Criar Notícia
        </button>
      </form>
    </div>
  );
}
