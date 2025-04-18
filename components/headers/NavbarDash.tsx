"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiUserLight } from "react-icons/pi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoRshop from "@/public/images/r-shop.png";
import { CategoryNavigation } from "../autres/CategoryNavigation";
import LoginDrawer from "@/app/(auth)/login/LoginDrawer";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur lors du parsing de l'utilisateur:", e);
        setUser(null);
      }
    }
    setLoading(false); // Fin du chargement
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src={LogoRshop}
              alt="Logo"
              width={200}
              height={20}
              className="h-10 w-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Navbar Items */}
        <div className="flex items-center gap-10 w-5/6">
          {/* Navigation */}
          <CategoryNavigation />

          {/* Links */}
          <ul className="flex">
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/">Accueil</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/about">À propos</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/shop">Boutique</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/contact">Contact</Link>
              </Button>
            </li>
          </ul>

          {/* User Profile */}
          {loading ? (
            <div>Chargement...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-800">Bonjour, {user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
                Se déconnecter
              </button>
              {/* Image de profil */}
              <Image
                src={user.profileImage || "/default-profile.png"} // Si pas d'image, image par défaut
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
<div></div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;



/*import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiUserLight } from "react-icons/pi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoRshop from "@/public/images/r-shop.png";
import { CategoryNavigation } from "../model/CategoryNavigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Fin du chargement
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between py-5">
       
        <div>
          <Link href="/">
            <Image
              src={LogoRshop}
              alt="Logo"
              width={200}
              height={20}
              className="h-10 w-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

       
        <div className="flex items-center gap-10 w-5/6">
          
          <CategoryNavigation />

          
          <ul className="flex">
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/">Accueil</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/about">À propos</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/shop">Boutique</Link>
              </Button>
            </li>
            <li className="inline-block px-4 py-2">
              <Button variant="link">
                <Link href="/contact">Contact</Link>
              </Button>
            </li>
          </ul>

          
          {loading ? ( // Afficher un état de chargement
            <div>Chargement...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-800">Bonjour, {user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
                Se déconnecter
              </button>
           
              <Image
                src={user.profileImage || "/default-profile.png"} // Si pas d'image, image par défaut
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="link" className="text-sm text-blue-500 hover:text-blue-700">
                  Se connecter
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="link" className="text-sm text-blue-500 hover:text-blue-700">
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
*/