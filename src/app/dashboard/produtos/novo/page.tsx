import { criarProduto } from "@/actions/produtoActions";
import ProdutoForm from "@/components/forms/ProdutoForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Produto",
};

export default function NovoProdutoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Adicionar Novo Produto</h1>
        <p className="text-zinc-500">Preencha os campos abaixo para cadastrar um novo produto no sistema.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <ProdutoForm onSave={criarProduto} />
      </div>
    </div>
  );
}