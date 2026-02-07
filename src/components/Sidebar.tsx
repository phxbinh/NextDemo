'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from './links';

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-black/50 backdrop-blur-xl border-r border-cyan-500/20">
      <nav className="p-6 space-y-2">
        {sidebarLinks
          .filter((l) => l.showInSidebar)
          .map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={`block px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? 'bg-cyan-900/40 text-cyan-300'
                      : 'text-gray-300 hover:bg-cyan-900/30'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}






