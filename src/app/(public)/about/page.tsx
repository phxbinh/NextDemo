
// app/page.tsx (hoặc bất kỳ trang nào)
import PricingCardCaNhanPlus from '../../../components/PricingCardCaNhanPlus';

export default function About() {
  return (
      <>        
        <h1 className="text-3xl font-bold text-center mb-10">Các gói hosting</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          <PricingCardCaNhanPlus />
          {/* Thêm các card khác nếu có */}
        </div>
      </>
  );
}