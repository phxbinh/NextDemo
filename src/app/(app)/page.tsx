  // src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-gray-100">
      <h1 className="
        text-3xl md:text-4xl
        font-black
        bg-clip-text text-transparent
        bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
        mb-6
        text-center
      ">
        Chào mừng đến Neon JS Todo
      </h1>

      <p className="
        text-base md:text-lg
        text-cyan-300
        mb-10
        text-center
        max-w-xl
      ">
        Ứng dụng todo với vibe cyberpunk neon – quản lý nhiệm vụ kiểu futuristic!
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/todos"
          className="
            px-6 py-3
            bg-gradient-to-r from-cyan-600 to-purple-600
            rounded-xl
            text-white
            font-semibold
            hover:from-cyan-500 hover:to-purple-500
            shadow-md shadow-purple-500/30
            transition-all
          "
        >
          Xem Todos
        </Link>

        <Link
          href="/about"
          className="
            px-6 py-3
            bg-black/30 backdrop-blur
            border border-cyan-500/30
            rounded-xl
            text-cyan-300
            hover:bg-cyan-900/30
            transition-all
          "
        >
          Về App
        </Link>

        <Link
          href="/dashboard"
          className="
            px-6 py-3
            bg-black/30 backdrop-blur
            border border-cyan-500/30
            rounded-xl
            text-cyan-300
            hover:bg-cyan-900/30
            transition-all
          "
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}



