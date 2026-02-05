'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Todos', href: '/todos' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-black/50 backdrop-blur-xl border-r border-cyan-500/20 shadow-2xl shadow-cyan-900/30 transform transition-transform md:translate-x-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-10">Neon Dashboard</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === link.href
                  ? 'bg-cyan-900/40 text-cyan-300 shadow-inner shadow-cyan-500/20'
                  : 'text-gray-300 hover:bg-cyan-900/30 hover:text-cyan-200'
              }`}
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}