'use client';

import Link from 'next/link';
import {
  Home,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  MenuIcon,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Usuários', href: '/users', icon: Users },
  { name: 'Produtos', href: '/products', icon: ShoppingCart },
  { name: 'Inventário', href: '/inventory', icon: Users },
  { name: 'Configurações', href: '/settings', icon: Settings },
  { name: 'Ajuda', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const [hasToken, setHasToken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
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
          className="fixed left-24 top-10 z-50"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] border-r bg-white p-0 sm:w-[400px]"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-gray-800 p-6">
            <SheetTitle className="text-2xl font-bold text-black">
              Menu
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Navegue pelas opções abaixo.
            </SheetDescription>
          </SheetHeader>
          <nav className="flex-grow space-y-2 p-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                className="flex w-full items-center justify-center text-black transition-all duration-200 ease-in-out hover:bg-gray-100"
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
