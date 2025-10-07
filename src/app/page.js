import Image from "next/image";
import RequireAuth from "@/components/RequireAuth";
import HomeAdmin from "@/components/HomeAdmin";

export default function Home() {
  return (
    <RequireAuth>
      <HomeAdmin />
    </RequireAuth>
  );
}
