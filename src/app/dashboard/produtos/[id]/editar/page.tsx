import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProdutoForm from '@/components/forms/ProdutoForm';
import { atualizarProduto } from '@/actions/produtoActions';

async function getProdutoById(id: string) {
  const produto = await prisma.produto.findUnique({
    where: { id },
  });
  return produto;
}

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const produto = await getProdutoById(id);

  if (!produto) {
    notFound();
  }

  const updateProdutoWithId = atualizarProduto.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Editar Produto</h1>
        <p className="text-zinc-500">Altere os dados do produto abaixo.</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <ProdutoForm produto={produto} onSave={updateProdutoWithId} />
      </div>
    </div>
  );
}