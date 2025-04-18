"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { CiShoppingBasket } from "react-icons/ci";
import { Product } from "@/types/Types";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import { PiTrashLight } from "react-icons/pi";

interface CartDrawerProps {
  cartProducts: Product[];
  onRemoveFromCart: (productId: number) => void;
  onClearCart: () => void;
}

const CartDrawer = ({ cartProducts, onRemoveFromCart, onClearCart }: CartDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="relative transition-transform duration-300 hover:scale-105">
            <div className="z-0 ml-4 absolute">
              <span className="relative flex h-4 w-4">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-600 opacity-25"></span>
                <span className="relative text-sm h-4 w-4 rounded-full flex items-center justify-center bg-red-600 text-white">
                  {cartProducts.length}
                </span>
              </span>
            </div>
            <div>
              <button className="text-primary" onClick={() => setOpen(true)}>
                <CiShoppingBasket size={33} />
              </button>
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="p-4">
          <h2 className="text-xl text-center p-6 font-medium">Votre Panier</h2>

          {cartProducts.length > 0 ? (
            <div className="lg:flex justify-between ">
              <div className="rounded-md border flex flex-col p-4 gap-6 ">
                <div className="max-h-[60vh] overflow-scroll overflow-x-hidden  p-4">

                  <ul>
                    {cartProducts.map((product) => (
                      <li key={product.id} className="flex justify-between items-center py-2 border-b gap-3 ">
                        <div className="flex items-center gap-3 ">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            width={200}
                            height={200}
                            className=" lg:h-16 w-16 lg:w-auto rounded-md"
                          />
                          <p>{product.name}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onRemoveFromCart(product.id)}
                          className="rounded-sm"
                        >
                          <PiTrashLight /> Supprimer
                        </Button>
                      </li>
                    ))}
                  </ul>

                </div>
                <Button
                  variant="destructive"
                  onClick={onClearCart}
                  disabled={cartProducts.length === 0}
                  className="rounded-sm"
                >
                  Vider le panier
                </Button>
              </div>
              <div>
                <Button
                  variant="default"
                  onClick={() => setOpen(false)}
                  className="px-6"
                >
                 Fermer
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="text-gray-500 my-4">Votre panier est vide.</p>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
