import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconTextColor: string;
}

export default function ModuleCard({ href, icon, title, description, iconBgColor, iconTextColor }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="block group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 h-80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      aria-label={`Acessar módulo ${title}: ${description}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center mb-4", iconBgColor)} aria-hidden="true">
            <div className={cn("h-6 w-6", iconTextColor)}>
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
        <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" aria-hidden="true">
          Acessar Módulo
        </span>
      </div>
    </Link>
  );
}