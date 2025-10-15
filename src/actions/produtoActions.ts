"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


interface FormState {
  message: string | null;
}

export async function criarProduto(
  previousState: FormState, 
  formData: FormData
) {
  try {
    const nome = formData.get("name") as string;
    const descricao = formData.get("description") as string;
    const precoUnitario = parseFloat(formData.get("precoUnitario") as string);
    const estoqueInicial = parseFloat(formData.get("estoque") as string);

    if (!nome || precoUnitario === undefined || estoqueInicial === undefined) {
      throw new Error("Nome, preço e estoque são obrigatórios.");
    }
    await prisma.produto.create({
      data: {
        name: nome,
        description: descricao,
        precoUnitario: precoUnitario,
        estoque: estoqueInicial,
      },
    });

  } catch (error) {
    console.error("Falha ao criar produto:", error);
    return {
      message: 'Falha no Banco de Dados: Não foi possível criar o produto.',
    };
  }
  revalidatePath("/dashboard/produtos");
  redirect("/dashboard/produtos");
}

export async function excluirProduto(produtoId: string) {
  try {
    await prisma.produto.delete({
      where: {
        id: produtoId,
      },
    });
  } catch (error) {
    console.error("Falha ao excluir produto:", error);
    return {
      message: 'Falha no Banco de Dados: Não foi possível excluir o produto.',
    };
  }
  revalidatePath("/dashboard/produtos");
}

export async function atualizarProduto(
  id: string,
  previousState: FormState,
  formData: FormData
) {
  try {
    const nome = formData.get("name") as string;
    const descricao = formData.get("description") as string;
    const precoUnitario = parseFloat(formData.get("precoUnitario") as string);
    const estoque = parseFloat(formData.get("estoque") as string);

    await prisma.produto.update({
      where: { id },
      data: {
        name: nome,
        description: descricao,
        precoUnitario: precoUnitario,
        estoque: estoque,
      },
    });
  } catch (_error) {
    console.error("Falha ao atualizar produto:", _error);
    return {
      message: 'Falha no Banco de Dados: Não foi possível atualizar o produto.',
    };
  }

  revalidatePath("/dashboard/produtos");
  redirect("/dashboard/produtos");
}