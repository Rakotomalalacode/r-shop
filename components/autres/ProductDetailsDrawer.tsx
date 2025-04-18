"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Product } from "@/types/Types";
import { useState } from 'react';

const ProductDetailsDrawer = ({
    product,
    onAddToCart,
    closeDrawer,
}: {
    product: Product | null;
    onAddToCart: (product: Product) => void;
    closeDrawer: () => void;
}) => {
    if (!product) return null;


    const [selectedImage, setSelectedImage] = useState<string>(product.image[0]);

    return (
        <Drawer open={!!product} onOpenChange={closeDrawer}>
            <DrawerContent className="p-4 w-full mx-auto">
                <h2 className="text-xl text-center font-medium p-6">{product.name}</h2>

                <div className="flex flex-col lg:flex-row lg:w-[90%] justify-between mx-auto gap-6">

                    <div className="flex flex-row-reverse items-center gap-4 w-full lg:w-[46%]">

                        <div className="w-full h-full border rounded-sm flex items-center justify-center transition-all duration-300">
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                width={300}
                                height={300}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>


                        <div className="flex flex-col h-full justify-between">
                            {product.image.map((src, index) => (
                                <button
                                    key={index}
                                    className={`w-24 h-24 border rounded-sm overflow-hidden transition-all duration-200 
                                        ${selectedImage === src ? "border-red-500 scale-105" : "border-gray-300 hover:border-red-400"}`}
                                    onClick={() => setSelectedImage(src)}
                                >
                                    <Image
                                        src={src}
                                        alt={`Image ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col w-full lg:w-[46%] gap-4">
                        <Image
                            src={product.image[0]}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-md"
                            alt={product.name} />

                        <p>Description : <span className="text-gray-500">{product.description}</span></p>
                        <p>Prix : <span className="text-gray-500">{product.prix} Ar</span></p>

                        <div className="flex gap-4">
                            <Button
                                onClick={() => {
                                    onAddToCart(product);
                                    closeDrawer();
                                }}
                                className="w-1/2 rounded-sm"
                            >
                                Ajouter au panier
                            </Button>
                            <Button
                                onClick={closeDrawer}
                                variant="outline"
                                className="w-1/2 rounded-sm"
                            >
                                Fermer
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductDetailsDrawer;
