import NovoClienteForm from "./novoClienteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Cliente",
};

export default function NovoClientePage() {
   return <NovoClienteForm />;
}