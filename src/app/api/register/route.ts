import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request){
    try{
        const body = await request.json();
        const {name, email, password} = body;

        if (!email || !password) {
            return new NextResponse('Email ou senha inválido.', {status:400});
        }

        const existingColaborator = await prisma.colaborador.findUnique({where: {email: email},});
        if (existingColaborator){
            return new NextResponse('Email já cadastrado.', {status:409});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const colaborador = await prisma.colaborador.create({
            data: {name, email, password: hashedPassword,},
        })

        const {password: _, ...colaboradorWithoutPassword} = colaborador;

        return NextResponse.json(colaboradorWithoutPassword);
    } catch (error) {
        console.error("ERRO NO CADASTRO: ", error);

        return new NextResponse("Erro interno.", {status:500});
    }
}