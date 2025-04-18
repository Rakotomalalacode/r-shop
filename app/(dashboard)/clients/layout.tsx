import NavbarOne from "@/components/headers/NavbarOne";
import { Metadata } from "next";

const name = "Clients"

export const metadata: Metadata = {
    title: `R-Shop | ${name}`,
    description: "Bienvenue sur la page de la bibliothèque",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarOne />
      <div>
        {children}
      </div>
    </div>
  );
}
