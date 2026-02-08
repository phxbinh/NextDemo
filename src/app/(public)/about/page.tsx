
/*
export default function About() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Về Todo App Neon JS</h1>
      <p className="mt-4">Ứng dụng todo với vibe neon cyberpunk...</p>
    </main>
  );
}
*/


// app/page.tsx (hoặc bất kỳ trang nào)
import PricingCardCaNhanPlus from '../../../components/PricingCardCaNhanPlus';

export default function Home() {
  return (
      <>        
        <h1 className="text-3xl font-bold text-center mb-10">Các gói hosting</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <PricingCardCaNhanPlus />
          {/* Thêm các card khác nếu có */}
        </div>
      </>
  );
}