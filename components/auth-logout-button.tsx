"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/database/browser-client";
import { Button } from "@/components/ui/button";

export function AuthLogoutButton() {
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (e) {
      // Pas bloquant: on redirige quand même.
      void e;
    } finally {
      localStorage.removeItem("connecter");
      router.push("/login");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="bg-primary cursor-pointer hover:scale-105 transition-all duration-500 text-white font-bold py-2 px-4 rounded"
    >
      {loading ? "Déconnexion..." : "Se déconnecter"}
    </Button>
  );
}

