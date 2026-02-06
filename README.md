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

## Cấu trúc cho auth
```txt
lib/
├─ auth/
│  ├─ server.ts        // createNeonAuth
│
app/
├─ (public)/
│  ├─ login/page.tsx
│  ├─ signup/page.tsx
│  ├─ confirm/page.tsx
│
├─ (app)/
│  ├─ layout.tsx       // Sidebar + auth guard
│  ├─ page.tsx
│
├─ api/
│  └─ auth/[...path]/route.ts
│
middleware.ts
```