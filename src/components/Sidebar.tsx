import Link from "next/link";
import { Settings, HelpCircle } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-8">Menu</h2>
      <nav>
        <ul className="space-y-4 text-lg">
          <li>
            <Link href="/dashboard/ajuda" className="flex items-center gap-3 hover:text-emerald-400">
              <HelpCircle size={20} />
              Ajuda
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3">
              <Settings size={20} />
              Configurações
            </div>
            <ul className="pl-8 pt-3 space-y-3 text-base text-zinc-400">
              <li><Link href="/dashboard/settings/system" className="hover:text-emerald-400">Config. do Sistema</Link></li>
              <li><Link href="/dashboard/settings/user" className="hover:text-emerald-400">Preferências</Link></li>
              <li><Link href="/dashboard/settings/backup" className="hover:text-emerald-400">Backup</Link></li>
              <li><Link href="/dashboard/settings/security" className="hover:text-emerald-400">Segurança</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}