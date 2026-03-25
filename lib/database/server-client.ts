import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getEnvironmentVariable() {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing environment variables for Supabase");
  }

  return { supabaseUrl, supabaseKey };
}


export async function createClient() {
  const { supabaseUrl, supabaseKey } = getEnvironmentVariable();
  const cookiesStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey,{
    cookies: {
        getAll(){
            return cookiesStore.getAll();
    },
    setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>): void {
        try {
            cookiesToSet.forEach(({name, value, options}) => 
                cookiesStore.set(name, value, options)
            );
        } catch (error) {
            console.log("Error setting cookies:", error);
        }
    }
    }
  });
}
