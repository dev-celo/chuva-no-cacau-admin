// app/api/posts/novo/route.js
import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // Adiciona o post na coleção 'posts'
    const docRef = await db.collection("posts").add({
      ...data,
      dataCriacao: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (err) {
    console.error("Erro criando post:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
