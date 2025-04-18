"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LogoRshop from "@/public/images/r-shop.png";
import SearchBar from "../autres/SearchBar";
import NavbarOneMenu from "@/constant/menu";
import Link from "next/link";
import CartDrawer from "../autres/CartDrawer";
import { LoginDrawer } from "../../app/(auth)/login/LoginDrawer";
import { CategoryNavigation } from "../autres/CategoryNavigation";
import { Button } from "../ui/button";
import  Product  from "@/types/Types";
import ProductDetailsDrawer from "../autres/ProductDetailsDrawer";
import { RiMenuAddLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { LuUserRoundX } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import CategoryMobileOne from "../autres/CategoryMobileOne";
import { useRouter } from "next/navigation";
import EditProfile from "../autres/EditProfile";
import User from "@/types/Types"



const NavbarOne = () => {


  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartProducts((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartProducts((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDrawer = () => {
    setSelectedProduct(null);
  };

  // Fonction pour vider complètement le panier
  const handleClearCart = () => {
    setCartProducts([]);
  };

 // const [user, setUser] = useState(null);

 const [user, setUser] = useState<User | null>(null);

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
    router.push("/"); // Redirige vers la page d'accueil après la déconnexion
  };



  return (
    <div className="backdrop-blur-sm sticky top-0">
      <div className="container hidden lg:flex items-center justify-between m-auto py-5">
        <div>
          <Link href={"/"}>
            <Image
              src={LogoRshop}
              alt={"R-SHOP"}
              width={200}
              height={20}
              className="h-10 w-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex w-5/6 items-center justify-between ">
          <div>
            <CategoryNavigation />
          </div>
          <div className="w-3/5">
            <SearchBar
              onProductSelect={handleProductSelect}
            />
            {selectedProduct && (
              <ProductDetailsDrawer
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                closeDrawer={closeDrawer}
              />
            )}
          </div>
          <ul className="flex">
            {NavbarOneMenu.map((items) => (
              <li key={items.name} className="inline-block px-4 py-2">
                <Button variant={"link"}>
                  <Link href={items.href}>{items.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex gap-10">
            <CartDrawer
              cartProducts={cartProducts}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart} />

            {loading ? ( 
              <div><LuUserRoundX size={33}  /></div>
            ) : user ? (
              <div className="flex justify-center items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Image
                        src={user.profileImage || "/images/default-profile.png"}
                        alt="Profile Picture"
                        width={60}
                        height={60}
                        className="rounded-full border border-red-600"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 mr-6 rounded" >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Bonjour, {user.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border-none"><EditProfile /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Button onClick={handleLogout} className="text-sm bg-transparent hover:bg-transparent text-red-500 hover:text-red-700 shadow-none w-full justify-between">
                              Se déconnecter <IoIosLogOut />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div> <LoginDrawer /></div>
            )}

          </div>
        </div>
      </div>
      <div className="container flex lg:hidden px-5 items-center justify-between m-auto py-5">
        <div>
          <Link href={"/"}>
            <Image
              src={LogoRshop}
              alt={"R-SHOP"}
              width={200}
              height={20}
              className="h-10 w-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
        <div>
          <Sheet>
            <SheetTrigger><RiMenuAddLine size={35} /></SheetTrigger>
            <SheetContent className="w-full">
              <div>
                <Link href={"/"}>
                  <Image
                    src={LogoRshop}
                    alt={"R-SHOP"}
                    width={200}
                    height={20}
                    className="h-10 w-32 mt-2 ml-2 transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>
              <div className="flex flex-col w-full items-center justify-center">
                <ul className="flex">
                  {NavbarOneMenu.map((items) => (
                    <li key={items.name} className="inline-block px-4 py-2">
                      <Button variant={"link"}>
                        <Link href={items.href}>{items.name}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-10 items-center">
                 <div>
                 <CartDrawer
                    cartProducts={cartProducts}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart} />
                 </div>

                  {loading ? (
                    <div><LuUserRoundX size={33}  /></div>
                  ) : user ? (
                    <div className="flex justify-center items-center gap-6">
                      <Popover>
                        <PopoverTrigger asChild>
                          <div>
                            <Image
                              src={user.profileImage || "/images/default-profile.png"}
                              alt="Profile Picture"
                              width={40}
                              height={40}
                              className="rounded-full border border-red-600"
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 mr-6 rounded" >
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Bonjour, {user.name}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="border-none"><EditProfile /></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Button onClick={handleLogout} className="text-sm bg-transparent hover:bg-transparent text-red-500 hover:text-red-700 shadow-none w-full justify-between">
                                    Se déconnecter <IoIosLogOut />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    <div> <LoginDrawer /></div>
                  )}
                </div>
                <div>
                  <CategoryMobileOne />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavbarOne;
