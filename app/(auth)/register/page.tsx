"use client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/validations/register-schema";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormInputField } from "@/components/form/form-input-field";
import { useState } from "react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { getSupabaseBrowserClient } from "@/lib/database/browser-client";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [openConfirme, setOpenConfirme] = useState(false);
  const supabase = getSupabaseBrowserClient();

  const router = useRouter();
  const form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    validators: { onSubmit: registerSchema },
    onSubmit: async ({ value }) => {
      await supabase.auth.signUp({
        email: value.email,
        password: value.password,
      });
      router.push("/login");
      console.log("Form submitted with values:", value);
    },
  });

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      alert("Erreur OAuth: " + error.message);
    }
  };
  return (
    <div className="w-full h-dvh flex justify-center flex-col md:flex-row bg-background ">
      <div className="w-full md:w-1/2 flex justify-center">
        <p className="text-3xl m-4 w-14 h-14 flex justify-center items-center font-bold p-1 border-2 border-primary rounded-full">
          <span className="text-primary">Y</span>T
        </p>
        <div className="hidden  m-4 md:flex flex-col gap-4 justify-center">
          <div>
            <h1 className="text-4xl font-bold">Bienvenue sur Yaro Tech</h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2  shadow-md p-4  flex justify-center items-center rounded-lg min-w-sm">
        <div className="flex  justify-between items-center flex-col w-full max-w-lg min-w-sm">
          <div className="w-full flex flex-col items-start p-2">
            <div className="w-full py-2 text-xl font-bold text-primary">
              Créer un compte
            </div>
            <div>Veuillez saisir vos identifiants pour créer un compte.</div>
          </div>
          <div className="p-6 w-full">
            <form
              id="bug-report-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field name="email">
                  {(field) => (
                    <FormInputField
                      type="email"
                      field={field}
                      label="Vôtre email"
                      placeholder="exemple@domaine.com"
                      className="bg-card"
                    />
                  )}
                </form.Field>
                <form.Field name="password">
                  {(field) => (
                    <FormInputField
                      field={field}
                      type="password"
                      label="Vôtre mot de passe"
                      placeholder="Entrez votre mot de passe"
                      open={open}
                      onOpenChange={setOpen}
                      className="bg-card"
                    />
                  )}
                </form.Field>
                <form.Field name="confirmPassword">
                  {(field) => (
                    <FormInputField
                      field={field}
                      type="password"
                      label="Confirmer le mot de passe"
                      placeholder="Confirmez votre mot de passe"
                      open={openConfirme}
                      onOpenChange={setOpenConfirme}
                      className="bg-card"
                    />
                  )}
                </form.Field>
              </FieldGroup>
            </form>
          </div>
          <div className="w-full p-6">
            <Button
              type="submit"
              form="bug-report-form"
              className="w-full  rounded-xl"
            >
              Submit
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </div>
          <p className="flex justify-center items-center font-extrabold m-1 text-foreground/50">
            -----------------------
            <span className="text-xl font-bold p-2">ou</span>
            -----------------------
          </p>
          <div className="w-full p-6 ">
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex flex-row items-center justify-center rounded-xl gap-4 bg-card hover:bg-primary p-2 hover:text-white transition-all duration-700 cursor-pointer"
            >
              <FcGoogle size={24} className="text-primary" strokeWidth={1.5} />{" "}
              Se connecter avec Google
            </button>
            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="group w-full flex flex-row items-center justify-center mt-4 rounded-xl gap-4 bg-card hover:bg-primary p-2 hover:text-white transition-all duration-700 cursor-pointer"
            >
              <FaFacebook
                size={24}
                className="text-primary group-hover:text-white"
                strokeWidth={1.5}
              />{" "}
              Se connecter avec Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
