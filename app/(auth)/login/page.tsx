
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoRshop from "@/public/images/r-shop.png";
import Image from "next/image";

const SECRET_KEY = "ma_clé_secrète_très_longue_et_sécurisée";

const Login = () => {
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
        if (userData.email == "admin@rshop.mg") {
          router.push(`/admin?=${encodeURIComponent(encryptedId)}`);
        } else {
          router.push(`/clients?https://www.r-shop=${encodeURIComponent(encryptedId)}`);
        }

      } else {
        setError("ID utilisateur introuvable dans la réponse.");
      }
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue");
    }
  };

  return (

    <div className="gap-1 flex items-center min-w-screen justify-center min-h-screen  ">
      <div className="w-[30%] p-5 shadow">
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
          <p className="text-2xl mb-3 font-medium">
            Se Connecter
          </p>
        </div>
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

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
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
      </div>
    </div>
  );
};

export default Login;


/*
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoRshop from "@/public/images/r-shop.png";
import Image from "next/image";

const SECRET_KEY = "ma_clé_secrète_très_longue_et_sécurisée";

const Login = () => {
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
        router.push(`/clients?=${encodeURIComponent(encryptedId)}`);
      } else {
        setError("ID utilisateur introuvable dans la réponse.");
      }
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue");
    }
  };

  return (

    <div className="gap-1 flex items-center min-w-screen justify-center min-h-screen  ">
      <div className="w-[30%] p-5 shadow">
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
          <p className="text-2xl mb-3 font-medium">
            Se Connecter
          </p>
        </div>
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

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
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
      </div>
    </div>
  );
};

export default Login;*/