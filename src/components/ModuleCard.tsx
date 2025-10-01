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
    <Link href={href} className="h-80 block group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center mb-4", iconBgColor)}>
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
        <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          Acessar Módulo
        </span>
      </div>
    </Link>
  );
}