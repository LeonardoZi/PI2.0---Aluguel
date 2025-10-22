"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 bg-white border-b shadow-sm" role="banner">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
        Pular para o conteúdo principal
      </a>
      
      <div className="absolute top-0 left-0 h-16 flex items-center pl-4 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Abrir menu de navegação">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-zinc-900 text-white border-zinc-800 p-0" aria-label="Menu lateral" title="Menu de Navegação">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={"/dashboard"} aria-label="Ir para página inicial do dashboard">
          <h1 className="font-bold text-xl">
            Aluguel de Produtos
          </h1>
        </Link>
      </div>

    </header>
  );
}