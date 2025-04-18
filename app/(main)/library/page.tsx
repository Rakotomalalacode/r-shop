import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "R-Shop | Bibliothèques",
  description: "Bienvenue sur la page de la bibliothèque",
};

const Library = () => { 
    return (
          <div className="container h-64 m-auto">
          <div className="w-full flex items-center justify-center text-4xl">
           <h1>Bienvenue sur la page de la bibliothèque</h1>
          </div>
       </div>
    );
    }

export default Library;