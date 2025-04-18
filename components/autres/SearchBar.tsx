"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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



const SearchBar = ({ onProductSelect }: { onProductSelect: (product: Product) => void }) => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredProducts([]);
      setNoResults(false);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      onProductSelect(filteredProducts[selectedIndex]);
      setFilteredProducts([]);
      setNoResults(false);
    }
  };

  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    setFilteredProducts([]);
    setNoResults(false);
  };

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
    <div className="relative w-[90%] mx-auto">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:border-red-500"
      />
      {filteredProducts.length > 0 && (
        <div className="absolute w-full max-w-xl left-1/2 -translate-x-1/2 mt-1 bg-white border rounded-sm shadow">
          <div className="flex flex-wrap justify-between w-full max-h-52 overflow-scroll overflow-x-hidden">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`flex gap-4 cursor-pointer w-[50%] p-5 hover:bg-slate-50 ${selectedIndex === index ? "bg-blue-100" : ""}`}
                onClick={() => handleProductClick(product)}
              >
                {product.images?.[0]?.url && (
                <Image
                src={product.images[0].url}
                alt={product.name}
                  width={500}
                  height={500}
                  className="w-16 h-16" />
                )}
                <div>
                  <p>{product.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center p-2">
            <Button variant={"link"}>
              <Link href={"/products"}>Voir tous les produits</Link>
            </Button>
          </div>
        </div>
      )}
      {noResults && query.length > 0 && (
        <div className="absolute left-0 w-full mt-1 p-4 bg-white border rounded-sm shadow flex justify-center items-center text-gray-500">
          Aucun produit ne correspond à "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
