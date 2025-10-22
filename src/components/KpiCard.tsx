
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
    <div
      className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 flex items-center justify-between"
      role="article"
      aria-label={`${title}: ${formattedValue}`}
    >
      <div>
        <p className="text-sm text-gray-500" id={`kpi-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </p>
        <h3
          className="text-2xl font-bold mt-1"
          aria-labelledby={`kpi-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {formattedValue}
        </h3>
      </div>
      <div
        className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"
        aria-hidden="true"
      >
        {icon}
      </div>
    </div>
  );
}