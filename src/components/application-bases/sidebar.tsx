"use client";

import Link from "next/link";
import {
  Home,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  MenuIcon,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Usuários", href: "/users", icon: Users },
  { name: "Produtos", href: "/products", icon: ShoppingCart },
  { name: "Inventório", href: "/inventory", icon: Users },
  { name: "Configurações", href: "/settings", icon: Settings },
  { name: "Ajuda", href: "/help", icon: HelpCircle },
];

export default function Sidebar() {
  const [hasToken, setHasToken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setHasToken(!!token);
    }
  }, []);

  if (!hasToken) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-10 left-24 z-50"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] border-r bg-black p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b border-gray-800 p-6">
            <SheetTitle className="text-2xl font-bold text-white">
              Menu
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Navegue pelas opções abaixo.
            </SheetDescription>
          </SheetHeader>
          <nav className="flex-grow p-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium bg-white text-black transition-all duration-200 ease-in-out hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <SheetFooter className="border-t border-gray-800 p-6">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-all duration-200 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Fechar Menu
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
