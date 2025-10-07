"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_UID = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID;

export default function RequireAuth({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid === ADMIN_UID) {
        setAutenticado(true);
      } else {
        setAutenticado(false);
      }
    });
    return () => unsubscribe();
  }, []);


  if (autenticado === null) return <p>Carregando...</p>; // mostra loading até checar
  if (!autenticado) return <p>Acesso negado</p>; // só depois mostra acesso negado

  return <>{children}</>;
}
