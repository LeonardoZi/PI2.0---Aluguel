"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const clienteSchema = z.object({
    nome: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres."}),
    email: z.string().email({ message: "Email inválido."}),
    cpf: z.string().length(14, { message: "O CPF deve ter 14 caracteres."}),
    phone: z.string().min(10, { message: "O telefone deve ter no mínimo 10 caracteres."}),
    endereco: z.string().optional(),
});

export async function criarCliente(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const validation = clienteSchema.safeParse(data);

    if (!validation.success) {
        return {success: false, errors: validation.error.flatten().fieldErrors};
    }

    const { nome, email, cpf, phone, endereco } = validation.data;

    try {
        const novoCliente = await prisma.cliente.create({
            data: {
                name: nome,
                Email: email,
                cpf,
                phone,
                adress: endereco,
            },
        });
        return { success: true, cliente: novoCliente };
    } catch (error: unknown) {
        const isPrismaError = (e: unknown): e is { code?: string; meta?: unknown } => {
            return typeof e === 'object' && e !== null && 'code' in e;
        };

        if (isPrismaError(error) && error.code === 'P2002') {
            const meta = error.meta as { target?: unknown } | undefined;
            let campoComErro = '';

            if (meta) {
                if (Array.isArray(meta.target)) {
                    campoComErro = meta.target.join(', ');
                } else {
                    campoComErro = String(meta.target ?? 'campo');
                }
            }

            return { success: false, message: `Erro: o ${campoComErro} já está em uso.` };
        }

        console.error('Erro ao criar cliente:', error);
        return { success: false, message: 'Não foi possível criar o cliente.' };
    }
}
