"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/database/browser-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        setMessage("Erreur : " + error.message);
        return;
      }

      setMessage("Un email de réinitialisation a été envoyé si l'adresse existe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[50vh] flex justify-center items-center flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold text-primary">Mot de passe oublié</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
        <Input
          type="email"
          placeholder="exemple@domaine.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Envoi..." : "Envoyer le lien"}
        </Button>

        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      </form>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="text-sm text-primary hover:underline"
      >
        Retour à la connexion
      </button>
    </div>
  );
}

