/*
export const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', showInSidebar: true },
    { name: 'Todos', href: '/todos', showInSidebar: true },
    //{ name: 'Profile', href: '/profile', showInSidebar: true },
    //{ name: 'Settings', href: '/settings', showInSidebar: true },
    { name: 'About', href: '/about', showInSidebar: true },
    { name: 'Products', href: '/admin/products', showInSidebar: true },
  { name: 'Todo no images', href: '/todoimages', showInSidebar: true },
  { name: 'Todo with images', href: '/todowithimage', showInSidebar: true },
  { name: 'Add products', href: '/admin/products/new', showInSidebar: true },
     { name: 'Cre.Product types', href: '/admin/product-types', showInSidebar: true },
    { name: 'Cre.Pro.type.attributes', href: '/admin/product-types/attribute-manager', showInSidebar: true },
 
     { name: 'Cre.attributes', href: '/admin/attributes', showInSidebar: true },
     { name: 'Products full', href: '/admin/products-full', showInSidebar: true },
    { name: 'Products view', href: '/admin/product-view', showInSidebar: true },
  ];
*/

// src/components/links.ts
export type SidebarLink = {
  name: string;
  href?: string;           // nếu có href → là link lá
  icon?: string;           // (tuỳ chọn) có thể thêm icon sau
  showInSidebar?: boolean;
  children?: SidebarLink[]; // sub menu
};

export const sidebarLinks: SidebarLink[] = [
  { name: 'Dashboard', href: '/dashboard', showInSidebar: true },

  {
    name: 'Todos',
    showInSidebar: true,
    children: [
      { name: 'Todo list (no images)', href: '/todoimages' },
      { name: 'Todo with images', href: '/todowithimage' },
    ],
  },

  {
    name: 'Products Management',
    showInSidebar: true,
    children: [
      { name: 'All Products', href: '/admin/products' },
      { name: 'Products (full)', href: '/admin/products-full' },
      { name: 'Product View', href: '/admin/product-view' },
      { name: 'Add New Product', href: '/admin/products/new' },
    ],
  },

  {
    name: 'Product Types & Attributes',
    showInSidebar: true,
    children: [
      { name: 'Product Types', href: '/admin/product-types' },
      { name: 'Type Attributes', href: '/admin/product-types/attribute-manager' },
      { name: 'All Attributes', href: '/admin/attributes' },
    ],
  },

  { name: 'About', href: '/about', showInSidebar: true },

  { name: 'Profile', href: '/profile', showInSidebar: true },
  { name: 'Settings', href: '/settings', showInSidebar: true },
];