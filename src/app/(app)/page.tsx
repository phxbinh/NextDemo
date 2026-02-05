  // src/app/page.tsx
/*
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 text-gray-100">
      <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-8">
        Chào mừng đến Neon JS Todo
      </h1>
      
      <p className="text-2xl text-cyan-300 mb-12 text-center max-w-2xl">
        Ứng dụng todo với vibe cyberpunk neon – quản lý nhiệm vụ kiểu futuristic!
      </p>

      <div className="flex gap-6">
        <Link 
          href="/todos" 
          className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl text-white font-bold hover:from-cyan-500 hover:to-purple-500 shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300"
        >
          Xem Todos Ngay
        </Link>
        
        <Link 
          href="/about" 
          className="px-10 py-5 bg-black/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl text-cyan-300 font-medium hover:bg-cyan-900/30 transition-all"
        >
          Về App
        </Link>
                <Link 
          href="/dashboard" 
          className="px-10 py-5 bg-black/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl text-cyan-300 font-medium hover:bg-cyan-900/30 transition-all"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
*/


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



