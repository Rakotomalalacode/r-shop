"use client"

import { useState } from 'react'

export default function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    prix: '',
    description: '',
    Category: '',
    image: [''],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.image]
    newImages[index] = value
    setForm((prev) => ({ ...prev, image: newImages }))
  }

  const addImageField = () => {
    setForm((prev) => ({ ...prev, image: [...prev.image, ''] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...form,
      prix: parseInt(form.prix),
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('Produit ajouté avec succès !')
      setForm({
        name: '',
        prix: '',
        description: '',
        Category: '',
        image: [''],
      })
    } else {
      alert('Erreur lors de l\'ajout')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="prix"
        placeholder="Prix"
        value={form.prix}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="Category"
        placeholder="Catégorie"
        value={form.Category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <div className="space-y-2">
        {form.image.map((img, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={img}
            onChange={(e) => handleImageChange(index, e.target.value)}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="button" onClick={addImageField} className="text-blue-500">
          + Ajouter une image
        </button>
      </div>

      <button type="submit" className="bg-black text-white p-2 rounded w-full">
        Créer le produit
      </button>
    </form>
  )
}




/*
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoRshop from "@/public/images/r-shop.png";
import Image from 'next/image';

export default function Products() {
    const [form, setForm] = useState({ type: '', name: '', prix: '', description: '' });
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      const res = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors de l\'inscription.');
      }
    };
  
    return (
      <div className="gap-1 flex items-center min-w-screen justify-center min-h-screen  ">
        <div className="w-[30%] p-5 shadow">
          <div className="flex flex-row gap-4 items-center justify-center">
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
              New Product
            </p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            </div>
            <input
              name="type"
              placeholder="Type du produit"
              onChange={handleChange}
              className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
              required />
            <input
              name="name"
              placeholder="Nom du produit"
              onChange={handleChange}
              className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
              required />
            <input
              name="prix"
              type='number'
              placeholder="Prix du produit"
              onChange={handleChange}
              className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
              required />
               <input
              name="description"
              placeholder="Description du produit"
              onChange={handleChange}
              className="focus:outline-none text-sm border-[1px] w-full rounded-sm px-2 py-2 focus:ring-1 focus:ring-[#6358DC]"
              required />
            <Button
              type="submit"
              className="py-4 rounded-sm text-white text-xl"
            >Ajouter</Button>
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    );
}*/