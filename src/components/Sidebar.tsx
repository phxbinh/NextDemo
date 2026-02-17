/*
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
*/

// components/Sidebar.tsx
/* //submenu bar
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react'; // hoặc dùng heroicons / icon nào bạn thích
import { sidebarLinks, type SidebarLink } from './links';

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const isActive = (href?: string) =>
    href && (pathname === href || pathname.startsWith(href + '/'));

  const isSectionActive = (item: SidebarLink) => {
    if (item.href && isActive(item.href)) return true;
    if (item.children?.some((child) => isActive(child.href))) return true;
    return false;
  };

  const renderLink = (link: SidebarLink, depth = 0) => {
    const hasChildren = !!link.children?.length;
    const active = isActive(link.href);
    const sectionActive = isSectionActive(link);
    const isOpen = openMenus.has(link.name);

    const paddingLeft = depth * 12 + 16; // 1rem = 16px

    if (hasChildren) {
      return (
        <div key={link.name} className="select-none">
          <button
            type="button"
            onClick={() => toggleMenu(link.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition
              ${sectionActive ? 'text-cyan-300 bg-cyan-900/30' : 'text-gray-300 hover:bg-cyan-900/20'}`}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            <span>{link.name}</span>
            {isOpen ? (
              <ChevronDown size={18} className="transition-transform" />
            ) : (
              <ChevronRight size={18} className="transition-transform" />
            )}
          </button>

          {isOpen && (
            <div className="mt-1 mb-2 space-y-1">
              {link.children!.map((child) => renderLink(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Leaf link
    return (
      <Link
        key={link.href}
        href={link.href!}
        onClick={onNavigate}
        className={`block rounded-xl transition
          ${active
            ? 'bg-cyan-900/50 text-cyan-200 font-medium'
            : 'text-gray-300 hover:bg-cyan-900/25 hover:text-cyan-200'
          }`}
        style={{ paddingLeft: `${paddingLeft}px`, paddingTop: '0.75rem', paddingBottom: '0.75rem', paddingRight: '1rem' }}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <aside className="h-full w-64 bg-black/50 backdrop-blur-xl border-r border-cyan-500/20 overflow-y-auto">
      <nav className="p-6 space-y-1">
        {sidebarLinks
          .filter((l) => l.showInSidebar !== false)
          .map((link) => renderLink(link, 0))}
      </nav>
    </aside>
  );
}
*/


// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { sidebarLinks, type SidebarLink } from './links';

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) newSet.delete(name);
      else newSet.add(name);
      return newSet;
    });
  };

  const isActive = (href?: string) =>
    href && (pathname === href || pathname.startsWith(`${href}/`));

  const isSectionActive = (item: SidebarLink) =>
    item.href && isActive(item.href) ||
    item.children?.some((child) => isActive(child.href));

  const renderLink = (link: SidebarLink, depth = 0) => {
    const hasChildren = !!link.children?.length;
    const active = isActive(link.href);
    const sectionActive = isSectionActive(link);
    const isOpen = openMenus.has(link.name);

    // Padding nhất quán: base 16px + mỗi cấp con +12px
    const pl = 16 + depth * 12;

    if (hasChildren) {
      return (
        <div key={link.name} className="overflow-hidden">
          <button
            type="button"
            onClick={() => toggleMenu(link.name)}
            className={`
              group flex w-full items-center justify-between 
              rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
              ${sectionActive 
                ? 'bg-cyan-950/40 text-cyan-300' 
                : 'text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-200'
              }
            `}
            style={{ paddingLeft: `${pl}px` }}
          >
            <span>{link.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Submenu với animation mượt */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="py-1 space-y-0.5">
              {link.children!.map((child) => renderLink(child, depth + 1))}
            </div>
          </div>
        </div>
      );
    }

    // Leaf item
    return (
      <Link
        key={link.href}
        href={link.href!}
        onClick={onNavigate}
        className={`
          block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${active
            ? 'bg-cyan-900/50 text-cyan-200 font-semibold'
            : 'text-gray-300 hover:bg-cyan-950/25 hover:text-cyan-200'
          }
        `}
        style={{ paddingLeft: `${pl}px` }}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <aside className="
      h-full w-64 
      bg-gradient-to-b from-black/60 to-black/80 
      backdrop-blur-xl 
      border-r border-cyan-500/15 
      overflow-y-auto
    ">
      <nav className="py-5 px-3 space-y-1">
        {sidebarLinks
          .filter((l) => l.showInSidebar !== false)
          .map((link) => renderLink(link, 0))}
      </nav>
    </aside>
  );
}





