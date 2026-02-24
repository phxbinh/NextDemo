'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SidebarLink } from './links';

type SidebarClientProps = {
  links: SidebarLink[];
  onNavigate?: () => void;
};

/* ------------------ Animated Height ------------------ */

function AnimatedSubmenu({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = `${el.scrollHeight}px`;

      const timeout = setTimeout(() => {
        el.style.height = 'auto';
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      el.style.height = `${el.scrollHeight}px`;
      requestAnimationFrame(() => {
        el.style.height = '0px';
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ height: 0 }}
    >
      {children}
    </div>
  );
}

/* ------------------ Sidebar Client ------------------ */

export default function SidebarClient({
  links,
  onNavigate,
}: SidebarClientProps) {
  const pathname = usePathname();

  const [openByLevel, setOpenByLevel] = useState<
    Record<number, string | null>
  >({});

  const toggleMenu = (name: string, depth: number) => {
    setOpenByLevel((prev) => ({
      ...prev,
      [depth]: prev[depth] === name ? null : name,
    }));
  };

  const isActive = (href?: string) =>
    href && (pathname === href || pathname.startsWith(`${href}/`));

  const isSectionActive = (item: SidebarLink) =>
    (item.href && isActive(item.href)) ||
    item.children?.some((child) => isActive(child.href));

  const renderLink = (link: SidebarLink, depth = 0): React.ReactNode => {
    const hasChildren = !!link.children?.length;
    const active = isActive(link.href);
    const sectionActive = isSectionActive(link);
    const isOpen = openByLevel[depth] === link.name;
    const pl = 16 + depth * 12;

    if (hasChildren) {
      return (
        <div key={`${depth}-${link.name}`}>
          <button
            type="button"
            onClick={() => toggleMenu(link.name, depth)}
            className={`
              group flex w-full items-center justify-between 
              rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
              ${
                sectionActive
                  ? 'bg-cyan-950/40 text-cyan-300'
                  : 'text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-200'
              }
            `}
            style={{ paddingLeft: `${pl}px` }}
          >
            <span>{link.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatedSubmenu isOpen={isOpen}>
            <div className="py-1 space-y-0.5">
              {link.children!.map((child) =>
                renderLink(child, depth + 1)
              )}
            </div>
          </AnimatedSubmenu>
        </div>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href!}
        onClick={onNavigate}
        className={`
          block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${
            active
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
    <nav className="py-5 px-3 space-y-1">
      {links.map((link) => renderLink(link, 0))}
    </nav>
  );
}