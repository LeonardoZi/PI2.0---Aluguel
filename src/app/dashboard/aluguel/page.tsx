import prisma from "@/lib/prisma"
import { PlusCircle } from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aluguéis",
};


async function getAluguel(): Promise<{ id: string; quantidade: number }[]> {
    try {
    const alugueis = await prisma.aluguel.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return alugueis;
    } catch (error) {
        console.error("Erro ao buscar alugueis", error);
        return [];
    }
}

export default async function AluguelPage() {
    const alugueis = await getAluguel();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between select-none">
                <div>
                    <h1 className="text-3xl font-bold">Gerenciar Aluguéis</h1>
                </div>
                <Link href="/dashboard/aluguel/novo">
                <Button className=" bg-slate-500">
                    <PlusCircle size={20} className="mr-2"/>
                    Novo Aluguel
                </Button>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Produto</th>
                            <th className="p-4">Quantidade</th>
                            <th className="p-4">Status</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {alugueis.length > 0 ? (
                            alugueis.map((aluguel) => (
                                <tr key={aluguel.id} className="border-b hover:bg-slate-50">
                                    <td className="p-4 font-medium">{aluguel.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-zinc-500 select-none">
                                Nenhum aluguel encontrado!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}