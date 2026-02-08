// components/PricingCardCaNhanPlus.tsx
'use client';
import React from 'react';

const PricingCardCaNhanPlus = () => {
  return (
    <div className="relative max-w-xs mx-auto bg-gradient-to-b from-cyan-50 to-white rounded-2xl shadow-xl overflow-hidden border border-cyan-200/70 hover:shadow-2xl transition-shadow duration-300">

      {/* Folder tab trên cùng */}
      <div className="absolute -top-3 left-6 bg-white rounded-t-lg px-5 py-1.5 shadow-md border border-b-0 border-cyan-200/60">
        <div className="flex items-center gap-2">
          <span className="text-xl">💎</span>
          <span className="font-semibold text-cyan-700">Cá Nhân +</span>
        </div>
      </div>

      {/* Nội dung chính */}
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

          {/* Khuyến mãi */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium">
              <span className="text-red-500 font-bold">🔴</span>
              Tặng tới X2 thời hạn
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