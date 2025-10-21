import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ActionsMenu } from "@/components/ActionsMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
}

async function getProdutos() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
          <p className="text-zinc-500">Adicione, edite e visualize os produtos do seu estoque.</p>
        </div>
        <Link href="/dashboard/produtos/novo">
          <Button className="bg-slate-500">
            <PlusCircle size={20} className="mr-2" />
            Adicionar Produto
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Nome do Produto</th>
              <th className="p-4">Estoque (un)</th>
              <th className="p-4">Valor Unidade</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <tr key={produto.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{produto.name}</td>
                  <td className="p-4">{produto.estoque}</td>
                  <td className="p-4">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(produto.precoUnitario)}
                  </td>
                  <td className="p-4">
                    <ActionsMenu produtoId={produto.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-zinc-500 select-none">
                  Nenhum produto encontrado. Adicione o primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}