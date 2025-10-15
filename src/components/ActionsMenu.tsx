"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { excluirProduto } from "@/actions/produtoActions";

interface ActionsMenuProps {
  produtoId: string;
}

export function ActionsMenu({ produtoId }: ActionsMenuProps) {
  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) {
      await excluirProduto(produtoId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/produtos/${produtoId}/editar`} className="flex items-center cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-500 flex items-center cursor-pointer">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}