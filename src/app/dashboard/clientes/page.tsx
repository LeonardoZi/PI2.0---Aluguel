import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clientes",
};

export default async function clientesPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between select-none">
                <h1 className="text-3xl font-bold">Gerenciar Clientes</h1>
                <Link href="/dashboard/clientes/novo">
                    <Button className="bg-slate-500">
                        <PlusCircle size={20} className="mr-2"/>Novo Cliente
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Número</th>
                            <th className="p-4">Endereço</th>
                            <th className="p-4">Email</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}