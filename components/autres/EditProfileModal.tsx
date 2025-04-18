"use client"

import { useState } from "react";
import { Button } from "../ui/button";

export const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    password: "",
    currentPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Effectuer l'appel API pour mettre à jour le profil
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Sauvegarder les données mises à jour dans le localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser.user));
        onClose(); // Fermer la modal après la soumission réussie
      } else {
        const error = await response.json();
        console.error("Erreur : ", error.error);
        // Vous pouvez ajouter une gestion d'erreur ici pour informer l'utilisateur
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-72">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">Modifier votre profil</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label className="block mb-2">Nouvelle image de profil</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="URL de l'image"
            />
          </div>
          <div>
            <label className="block mb-2">Mot de passe actuel</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Mot de passe actuel"
            />
          </div>
          <div>
            <label className="block mb-2">Nouveau mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Sauvegarder
            </Button>
            <Button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
