"use client";

import { useState } from "react";

export default function NovaNoticia() {
  const [valor, setValor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/preco-cacau/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({valor}),
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
          placeholder="Valor... ex: R$510,00"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Criar Cotação do dia
        </button>
      </form>
    </div>
  );
}
