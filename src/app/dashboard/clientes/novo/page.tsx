"use client";
import { criarCliente } from "@/actions/criarCliente";
import { useState } from "react";

export default function NovoClientePage() {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erros, setErros] = useState<Record<string, string[]> | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem(null);
    setErros(null);

    const formData = new FormData(event.currentTarget);
    const result = await criarCliente(formData);
    if (result.success) {
      setMensagem("Cliente criado com sucesso!");
      event.currentTarget.reset();
    } else {
      setMensagem(result.message || null);
      setErros(result.errors || null);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Adicionar Novo Cliente</h1>
      </div>

  <div className="bg-white p-4 rounded-lg shadow-sm border max-w-md mx-auto">
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Nome</label>
            <input name="nome" type="text" className="w-full border rounded px-3 py-2" required minLength={3} placeholder="Seu nome" />
            {erros?.nome && <span className="text-red-500 text-sm">{erros.nome.join(', ')}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" className="w-full border rounded px-3 py-2" required placeholder="123@gmail.com" />
            {erros?.email && <span className="text-red-500 text-sm">{erros.email.join(', ')}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">CPF</label>
            <input name="cpf" type="text" className="w-full border rounded px-3 py-2" required minLength={14} maxLength={14} placeholder="111.111.111-11" />
            {erros?.cpf && <span className="text-red-500 text-sm">{erros.cpf.join(', ')}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Telefone</label>
            <input name="phone" type="text" className="w-full border rounded px-3 py-2" required minLength={10} placeholder="(11) 91111-1111" />
            {erros?.phone && <span className="text-red-500 text-sm">{erros.phone.join(', ')}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Endereço</label>
            <input name="endereco" type="text" className="w-full border rounded px-3 py-2" placeholder="Seu endereço" />
            {erros?.endereco && <span className="text-red-500 text-sm">{erros.endereco.join(', ')}</span>}
          </div>
          <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded mt-4">Criar Cliente</button>
          {mensagem && <div className="mt-2 text-sm text-blue-600">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
}