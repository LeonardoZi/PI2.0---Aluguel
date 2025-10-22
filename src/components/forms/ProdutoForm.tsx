"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Produto } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

interface FormState {
  message: string | null;
}

interface ProdutoFormProps {
  onSave: (prevState: FormState, formData: FormData) => Promise<FormState>;
  produto?: Produto;
}

export default function ProdutoForm({ onSave, produto }: ProdutoFormProps) {
  const router = useRouter();
  const initialState: FormState = { message: null };
  const [state, dispatch] = useActionState(onSave, initialState);
  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={dispatch} className="space-y-6" aria-label={produto ? "Formulário de edição de produto" : "Formulário de cadastro de produto"}>
      <div className="space-y-2 select-none">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          name="name"
          defaultValue={produto?.name}
          required
          aria-required="true"
          aria-describedby={state?.message ? "form-error" : undefined}
        />
      </div>
      <div className="space-y-2 select-none">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={produto?.description || ''}
          aria-describedby="description-hint"
        />
        <span id="description-hint" className="sr-only">Campo opcional para adicionar detalhes sobre o produto</span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2 select-none">
          <Label htmlFor="precoUnitario">Preço Unidade</Label>
          <Input
            id="precoUnitario"
            name="precoUnitario"
            type="number"
            step="0.01"
            defaultValue={produto?.precoUnitario}
            required
            aria-required="true"
            aria-label="Preço unitário do produto em reais"
          />
        </div>
        <div className="space-y-2 select-none">
          <Label htmlFor="estoque">Estoque</Label>
          <Input
            id="estoque"
            name="estoque"
            type="number"
            step="0.01"
            defaultValue={produto?.estoque}
            required
            aria-required="true"
            aria-label="Quantidade em estoque"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="submit" aria-label={produto ? 'Salvar alterações do produto' : 'Salvar novo produto'}>
          {produto ? 'Salvar Alterações' : 'Salvar Produto'}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel} aria-label="Cancelar e voltar">
          Cancelar
        </Button>
      </div>
      {state?.message && (
        <p
          id="form-error"
          className="text-sm text-red-500"
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}