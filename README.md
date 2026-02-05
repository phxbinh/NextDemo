# NextDemo
NextDemo
taiwindcss

```txt
app/
├─ layout.tsx               → root (server)
├─ not-found.tsx
│
├─ (app)/                   → CÓ sidebar
│   ├─ layout.tsx           → SidebarLayout (client)
│   ├─ page.tsx             → /
│   ├─ dashboard/
│   │   └─ page.tsx         → /dashboard
│   ├─ todos/
│   │   └─ page.tsx         → /todos
│
├─ (public)/                → KHÔNG sidebar
│   ├─ layout.tsx
│   ├─ about/
│   │   └─ page.tsx         → /about
│   ├─ login/
│       └─ page.tsx         → /login

```