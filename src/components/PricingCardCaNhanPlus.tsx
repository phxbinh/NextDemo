// components/PricingCardCaNhanPlus.tsx
'use client';

/*
import React from 'react';

const PricingCardCaNhanPlus = () => {
  return (
    <div className="relative max-w-xs mx-auto bg-gradient-to-b from-cyan-50 to-white rounded-2xl shadow-xl overflow-hidden border border-cyan-200/70 hover:shadow-2xl transition-shadow duration-300">

      <div className="absolute -top-3 left-6 bg-white rounded-t-lg px-5 py-1.5 shadow-md border border-b-0 border-cyan-200/60">
        <div className="flex items-center gap-2">
          <span className="text-xl">💎</span>
          <span className="font-semibold text-cyan-700">Cá Nhân +</span>
        </div>
      </div>

      <div className="pt-10 pb-8 px-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          52.500 đ<span className="text-lg font-medium">/Tháng</span>
        </h3>
        <p className="text-sm text-gray-500 mb-6">Gói Cá Nhân nâng cao</p>

        <div className="space-y-3 text-left">
          <FeatureItem text="Dung lượng lưu trữ:" value="4GB SSD" />
          <FeatureItem text="Băng thông/tháng:" value="Unlimited" />
          <FeatureItem text="CPU:" value="1 core" />
          <FeatureItem text="RAM:" value="1 GB" />
          <FeatureItem text="FTP:" value="1 GB" />
          <FeatureItem text="FTP Account:" value="Unlimited" />
          <FeatureItem text="MySQL/MariaDB:" value="4" />
          <FeatureItem text="Domain:" value="2" />
          <FeatureItem text="Subdomain:" value="Unlimited" />
          <FeatureItem text="Alias/Parked Domain:" value="Unlimited" />
          <FeatureItem text="Email Account:" value="Unlimited" />

          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium">
              <span className="text-red-500 font-bold">🔴</span>
              Tặng tới X2 thời hạn
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          onClick={() => alert('Đã thêm vào giỏ hàng! (demo)')}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

// Component nhỏ để tái sử dụng
const FeatureItem = ({ text, value }: { text: string; value: string }) => (
  <div className="flex items-center gap-3">
    <svg
      className="w-5 h-5 text-green-500 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-gray-700">
      {text} <strong>{value}</strong>
    </span>
  </div>
);

export default PricingCardCaNhanPlus;
*/





// components/PricingCardCaNhanPlus.tsx
import React from 'react';

const PricingCardCaNhanPlus_ = () => {
  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-cyan-100 transform transition-all hover:scale-[1.02] hover:shadow-3xl">

      {/* Tab folder nổi bật */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2.5 font-bold text-lg z-10">
        <span className="text-2xl drop-shadow-md">💎</span>
        Cá Nhân +
      </div>

      {/* Nội dung */}
      <div className="pt-16 pb-10 px-6 md:px-8 text-center">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-1">
          52.500<span className="text-2xl font-semibold">đ</span>
          <span className="text-xl font-medium text-gray-600">/Tháng</span>
        </h3>
        <p className="text-base text-gray-600 mb-8 font-medium">Gói Cá Nhân nâng cao</p>

        <div className="space-y-4 text-left">
          {[
            "Dung lượng lưu trữ: 4GB SSD",
            "Băng thông/tháng: Unlimited",
            "CPU: 1 core",
            "RAM: 1 GB",
            "FTP: 1 GB",
            "FTP Account: Unlimited",
            "MySQL/MariaDB: 4",
            "Domain: 2",
            "Subdomain: Unlimited",
            "Alias/Parked Domain: Unlimited",
            "Email Account: Unlimited",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-800 font-medium">{feature}</span>
            </div>
          ))}

          {/* Khuyến mãi */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-50 border border-red-200 rounded-full shadow-sm">
              <span className="text-red-600 text-xl font-bold drop-shadow">🔴</span>
              <span className="text-red-700 font-semibold">Tặng tới X2 thời hạn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nút */}
      <div className="px-6 md:px-8 pb-10">
        <button className="w-full py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-600 hover:via-cyan-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};



// Trong component PricingCard (ví dụ Cá Nhân +)
const PricingCardCaNhanPlus = () => {
  return (
<div className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-cyan-100">

  {/* Tab header với "tai thỏ" khuyết - CSS thuần */}
  <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-10">
    <div className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full shadow-lg flex items-center gap-3 min-w-[220px] justify-center"
      style={{
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)', // Khuyết nhẹ hai bên đỉnh như tai thỏ
        borderRadius: '9999px 9999px 20px 20px', // Bo góc dưới để "dán" card
      }}
    >
      <span className="text-3xl">💎</span>
      Cá Nhân +
    </div>
  </div>

  {/* Nội dung card - tăng pt để tránh chồng */}
      {/* Nội dung */}
      <div className="pt-16 pb-10 px-6 md:px-8 text-center">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-1">
          52.500<span className="text-2xl font-semibold">đ</span>
          <span className="text-xl font-medium text-gray-600">/Tháng</span>
        </h3>
        <p className="text-base text-gray-600 mb-8 font-medium">Gói Cá Nhân nâng cao</p>

        <div className="space-y-4 text-left">
          {[
            "Dung lượng lưu trữ: 4GB SSD",
            "Băng thông/tháng: Unlimited",
            "CPU: 1 core",
            "RAM: 1 GB",
            "FTP: 1 GB",
            "FTP Account: Unlimited",
            "MySQL/MariaDB: 4",
            "Domain: 2",
            "Subdomain: Unlimited",
            "Alias/Parked Domain: Unlimited",
            "Email Account: Unlimited",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-800 font-medium">{feature}</span>
            </div>
          ))}

          {/* Khuyến mãi */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-50 border border-red-200 rounded-full shadow-sm">
              <span className="text-red-600 text-xl font-bold drop-shadow">🔴</span>
              <span className="text-red-700 font-semibold">Tặng tới X2 thời hạn</span>
            </div>
          </div>
        </div>
      </div>
      {/* Nút */}
      <div className="px-6 pb-8">
        <button
          className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          onClick={() => alert('Đã thêm vào giỏ hàng! (demo)')}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};









export default PricingCardCaNhanPlus;





