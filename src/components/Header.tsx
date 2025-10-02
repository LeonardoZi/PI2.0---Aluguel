"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 bg-white border-b shadow-sm">
      
      <div className="absolute top-0 left-0 h-16 flex items-center pl-4 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-zinc-900 text-white border-zinc-800 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-bold text-xl">
          Aluguel de Produtos
        </p>
      </div>

    </header>
  );
}