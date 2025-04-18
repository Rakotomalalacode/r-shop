'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: number
  name: string
  prix: number
  description: string
  Category: {
    name: string
  } | null
  images: {
    url: string
  }[]
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div className="p-8">
      <div className="w-full flex items-center justify-center text-4xl">
            <h1>Bienvenue sur la page des produits</h1>
           </div>
      <h1 className="text-2xl font-bold mb-6">Liste des produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md bg-white">
            {product.images?.[0]?.url && (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.Category?.name || 'Sans catégorie'}</p>
            <p className="text-blue-600 font-bold">{product.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  )
}
