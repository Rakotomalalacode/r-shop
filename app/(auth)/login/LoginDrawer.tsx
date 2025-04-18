
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { PiUserLight } from "react-icons/pi";
import LogoRshop from "@/public/images/r-shop.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js"; 
// Définir une clé secrète pour le chiffrement (à personnaliser et sécuriser)
const SECRET_KEY = "ma_clé_secrète_très_longue_et_sécurisée";

export function LoginDrawer() {
   const [form, setForm] = useState({ email: "", password: "" });
   const [error, setError] = useState("");
   const router = useRouter();
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError("");
 
     const res = await fetch("/api/auth/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(form),
     });
 
     if (res.ok) {
       const userData = await res.json();
       if (userData.id) {
         
         const encryptedId = CryptoJS.AES.encrypt(
           userData.id.toString(),
           SECRET_KEY
         ).toString();
         localStorage.setItem("user", JSON.stringify(userData));
         router.push(`/clients?https://www.r-shop=${encodeURIComponent(encryptedId)}`);
       } else {
         setError("ID utilisateur introuvable dans la réponse.");
       }
     } else {
       const data = await res.json();
       setError(data.error || "Une erreur est survenue");
     }
   };
 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary transition-transform duration-300 hover:scale-105">
          <PiUserLight size={33} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md gap-0">
        <DialogHeader>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Link href={"/"}>
              <Image
                src={LogoRshop}
                alt={"R-SHOP"}
                width={200}
                height={20}
                className="h-10 w-32 transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <DialogTitle className="text-2xl font-medium">
              Se Connecter
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-1 py-4">
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div>
              <button className="flex w-full rounded-sm gap-5 py-2 shadow items-center transition-transform duration-300 hover:scale-105 justify-center">
                <img
                  src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                  className="w-6 h-6"
                  alt=""
                />
                <p className="text-gray-500 text-sm">
                  Connectez-vous avec Google
                </p>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-4 text-md text-gray-600 text-xl border-b-[1.5px] w-full">
              <div className="bg-white px-4 mt-3">or</div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
                placeholder="Adresse email ou numéro de téléphone"
              />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
                placeholder="Mots de passe"
              />
              <div className="w-full flex justify-end text-sm -mt-1">
                <Button variant={"link"}>
                  <Link
                    href="/"
                    className="text-[#6358DC] hover:text-destructive"
                  >
                    Mot de passe oublié ?
                  </Link>
                </Button>
              </div>
              <Button
                type="submit"
                className="py-4 rounded-sm text-white text-xl"
              >
                Se Connecter
              </Button>
            </div>
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
          </form>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-center text-sm">
            <p>
              Vous n'avez pas de compte ?
              <Button variant={"link"}>
                <Link href="/register" className="text-[#6358DC]">
                  S'inscrire
                </Link>
              </Button>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDrawer;