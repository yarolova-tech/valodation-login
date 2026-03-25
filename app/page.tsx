import { redirect } from "next/navigation";
import { createClient } from "@/lib/database/server-client";
import { AuthLogoutButton } from "@/components/auth-logout-button";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  if (!user) redirect("/login");

  return (
    <div className="flex justify-center items-center flex-col gap-3 mt-10">
      <h1 className="font-bold text-center text-primary">
        Bienvenue sur Yaro Tech {user.email ?? ""}!
      </h1>

      <AuthLogoutButton />
    </div>
  );
}