import Link from "next/link";
import { Settings, HelpCircle } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-8">Menu</h2>
      <nav aria-label="Menu principal de navegação">
        <ul className="space-y-4 text-lg">
          <li>
            <Link
              href="/dashboard/ajuda"
              className="flex items-center gap-3 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1"
              aria-label="Ir para página de ajuda"
            >
              <HelpCircle size={20} aria-hidden="true" />
              Ajuda
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3" role="heading" aria-level={3}>
              <Settings size={20} aria-hidden="true" />
              Configurações
            </div>
            <ul className="pl-8 pt-3 space-y-3 text-base text-zinc-400" aria-label="Submenu de configurações">
              <li>
                <Link
                  href="/dashboard/settings/system"
                  className="hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 inline-block"
                >
                  Config. do Sistema
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings/user"
                  className="hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 inline-block"
                >
                  Preferências
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings/backup"
                  className="hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 inline-block"
                >
                  Backup
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings/security"
                  className="hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1 inline-block"
                >
                  Segurança
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}