"use client";
import { criarCliente } from "@/actions/criarCliente";
import { useState, useRef } from "react";

interface EnderecoData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .slice(0, 14);
};

export default function NovoClientePage() {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erros, setErros] = useState<Record<string, string[]> | null>(null);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: ""
  });
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepErro, setCepErro] = useState<string | null>(null);
  const [cpf, setCpf] = useState("");

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const buscarCep = async (cepValue: string) => {
    const cepNumeros = cepValue.replace(/\D/g, "");
    
    if (cepNumeros.length !== 8) {
      return;
    }

    setBuscandoCep(true);
    setCepErro(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`);
      const data: EnderecoData & { erro?: boolean } = await response.json();

      if (data.erro) {
        setCepErro("CEP não encontrado");
        setEndereco({
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
          numero: "",
          complemento: ""
        });
      } else {
        setEndereco({
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
          numero: "",
          complemento: ""
        });
        setCepErro(null);
      }
    } catch (error) {
      setCepErro("Erro ao buscar CEP");
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setBuscandoCep(false);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    
    if (formatted.replace(/\D/g, "").length === 8) {
      buscarCep(formatted);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem(null);
    setErros(null);

    const formData = new FormData(event.currentTarget);

    const unmaskedCpf = cpf.replace(/\D/g, "");
    formData.set("cpf", unmaskedCpf);
    
    const enderecoCompleto = `${endereco.logradouro}, ${endereco.numero}${endereco.complemento ? ', ' + endereco.complemento : ''} - ${endereco.bairro}, ${endereco.cidade}/${endereco.estado}`;
    formData.set("endereco", enderecoCompleto);
    
    const result = await criarCliente(formData);
    if (result.success) {
      setMensagem("Cliente criado com sucesso!");
      formRef.current?.reset();
      setCpf("");
      setCep("");
      setEndereco({
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
        complemento: ""
      });
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
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit} aria-label="Formulário de cadastro de cliente">
          <div>
            <label htmlFor="nome" className="block font-medium mb-1">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={3}
              placeholder="Seu nome"
              aria-required="true"
              aria-invalid={erros?.nome ? "true" : "false"}
              aria-describedby={erros?.nome ? "nome-error" : undefined}
            />
            {erros?.nome && <span id="nome-error" className="text-red-500 text-sm" role="alert">{erros.nome.join(', ')}</span>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              placeholder="123@gmail.com"
              aria-required="true"
              aria-invalid={erros?.email ? "true" : "false"}
              aria-describedby={erros?.email ? "email-error" : undefined}
            />
            {erros?.email && <span id="email-error" className="text-red-500 text-sm" role="alert">{erros.email.join(', ')}</span>}
          </div>
          <div>
            <label htmlFor="cpf" className="block font-medium mb-1">CPF</label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={14}
              maxLength={14}
              placeholder="111.111.111-11"
              value={cpf}
              onChange={handleCpfChange}
              aria-required="true"
              aria-invalid={erros?.cpf ? "true" : "false"}
              aria-describedby={erros?.cpf ? "cpf-error" : undefined}
            />
            {erros?.cpf && <span id="cpf-error" className="text-red-500 text-sm" role="alert">{erros.cpf.join(', ')}</span>}
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">Telefone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={10}
              placeholder="(11) 91111-1111"
              aria-required="true"
              aria-invalid={erros?.phone ? "true" : "false"}
              aria-describedby={erros?.phone ? "phone-error" : undefined}
            />
            {erros?.phone && <span id="phone-error" className="text-red-500 text-sm" role="alert">{erros.phone.join(', ')}</span>}
          </div>
          <div>
            <label htmlFor="cep" className="block font-medium mb-1">CEP</label>
            <input
              id="cep"
              type="text"
              value={cep}
              onChange={handleCepChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="00000-000"
              maxLength={9}
              aria-describedby="cep-status"
            />
            <div id="cep-status" aria-live="polite" aria-atomic="true">
              {buscandoCep && <span className="text-blue-500 text-sm">Buscando CEP...</span>}
              {cepErro && <span className="text-red-500 text-sm" role="alert">{cepErro}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="logradouro" className="block font-medium mb-1">Logradouro</label>
            <input
              id="logradouro"
              type="text"
              value={endereco.logradouro}
              onChange={(e) => setEndereco({...endereco, logradouro: e.target.value})}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
              placeholder="Rua, Avenida, etc."
              disabled={buscandoCep}
              aria-disabled={buscandoCep}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="numero" className="block font-medium mb-1">Número</label>
              <input
                id="numero"
                type="text"
                value={endereco.numero}
                onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="123"
              />
            </div>
            <div>
              <label htmlFor="complemento" className="block font-medium mb-1">Complemento</label>
              <input
                id="complemento"
                type="text"
                value={endereco.complemento}
                onChange={(e) => setEndereco({...endereco, complemento: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Apto, Bloco, etc."
              />
            </div>
          </div>

          <div>
            <label htmlFor="bairro" className="block font-medium mb-1">Bairro</label>
            <input
              id="bairro"
              type="text"
              value={endereco.bairro}
              onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
              placeholder="Bairro"
              disabled={buscandoCep}
              aria-disabled={buscandoCep}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cidade" className="block font-medium mb-1">Cidade</label>
              <input
                id="cidade"
                type="text"
                value={endereco.cidade}
                onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                placeholder="Cidade"
                disabled={buscandoCep}
                aria-disabled={buscandoCep}
              />
            </div>
            <div>
              <label htmlFor="estado" className="block font-medium mb-1">Estado</label>
              <input
                id="estado"
                type="text"
                value={endereco.estado}
                onChange={(e) => setEndereco({...endereco, estado: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                placeholder="UF"
                maxLength={2}
                disabled={buscandoCep}
                aria-disabled={buscandoCep}
              />
            </div>
          </div>

          <input type="hidden" name="endereco" />
          {erros?.endereco && <span className="text-red-500 text-sm" role="alert">{erros.endereco.join(', ')}</span>}
          <button
            type="submit"
            className="bg-slate-500 text-white px-4 py-2 rounded mt-4 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Criar novo cliente"
          >
            Criar Cliente
          </button>
          {mensagem && (
            <div
              className="mt-2 text-sm text-blue-600"
              role="status"
              aria-live="polite"
            >
              {mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}