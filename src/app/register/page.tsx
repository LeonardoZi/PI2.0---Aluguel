"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try{
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || "Falha ao registrar");
        }

        alert("Cadastro realizado com sucesso!");
        router.push("/login");
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Ocorreu um erro inesperado. Tente novamente");
        }
    }
    }    

    return (
        <div className='bg-gray-100 min-h-screen'>
            <form onSubmit={handleSubmit} className='text-black select-none bg-white' style={{
            border: "2px solid black",
            borderColor: "black",
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px"
        }}><h2 className='fonte-negrito text-center select-none'>Criar conta de colaborador</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
                className='focus:placeholder-transparent border-2 border-black pl-[5px]'
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className='focus:placeholder-transparent border-2 border-black pl-[5px]'
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className='focus:placeholder-transparent border-2 border-black pl-[5px]'
            />
            <button type="submit" className='fonte-negrito select-none border-2 border-black self-center px-6'>Cadastrar</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>
    )

};