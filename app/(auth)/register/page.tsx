"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoRshop from "@/public/images/r-shop.png";
import Image from 'next/image';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="gap-1 flex items-center min-w-screen justify-center min-h-screen  ">
      <div className="w-[30%] p-5 shadow">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Link
            href={"/"}
          >
            <Image
              src={LogoRshop}
              alt={"R-SHOP"}
              width={200}
              height={20}
              className="h-10 w-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <p className="text-2xl mb-5 font-medium">
            Inscription
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
          <input
            name="name"
            placeholder="Nom"
            onChange={handleChange}
            className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
            required />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
            required />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
            required />
          <Button
            type="submit"
            className="py-4 rounded-sm text-white text-xl"
          >S'inscrire</Button>
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
        </form>
        <div className="w-full flex justify-center text-sm">
          <p>
            Vous n'avez pas de compte ?
            <Button variant={"link"}>
              <Link href="/login" className="text-[#6358DC]">
              Se Connecter
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}




/*"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // Gérer l'état de soumission
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation de mot de passe (longueur minimale)
    if (form.password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true); // Indiquer que l'on est en train de soumettre le formulaire

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsSubmitting(false); // Réinitialiser l'état de soumission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
      <h2 className="text-xl font-medium">Inscription</h2>
      <input
        name="name"
        type="text"
        placeholder="Nom"
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
      >
        {isSubmitting ? 'Chargement...' : "S'inscrire"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
*/