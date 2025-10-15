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
    <form action={dispatch} className="space-y-6">
      <div className="space-y-2 select-none">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input id="name" name="name" defaultValue={produto?.name} required />
      </div>
      <div className="space-y-2 select-none">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea id="description" name="description" defaultValue={produto?.description || ''} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2 select-none">
          <Label htmlFor="precoUnitario">Preço Unidade</Label>
          <Input id="precoUnitario" name="precoUnitario" type="number" step="0.01" defaultValue={produto?.precoUnitario} required />
        </div>
        <div className="space-y-2 select-none">
          <Label htmlFor="estoque">Estoque</Label>
          <Input id="estoque" name="estoque" type="number" step="0.01" defaultValue={produto?.estoque} required />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="submit">{produto ? 'Salvar Alterações' : 'Salvar Produto'}</Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
    </form>
  );
}