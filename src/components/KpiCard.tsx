import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  formatAsCurrency?: boolean;
}

export default function KpiCard({ title, value, icon, formatAsCurrency = false }: KpiCardProps) {
  
  const formattedValue = formatAsCurrency
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    : value;

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">
          {formattedValue}
        </h3>
      </div>
      <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
        {icon}
      </div>
    </div>
  );
}