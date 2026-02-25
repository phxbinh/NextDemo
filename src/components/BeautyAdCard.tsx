// BeautyAdCard.tsx
'use client'
import React from 'react'; // Có thể bỏ nếu dự án React 17+ và tsconfig cho phép

interface BeautyAdCardProps {
  imageUrl?: string;
  shopeeLink?: string;
}

const BeautyAdCard: React.FC<BeautyAdCardProps> = ({
  imageUrl = "../app/public/images/IMG_4117.jpeg",
  shopeeLink = "https://s.shopee.vn/4AuM7gCugL",
}) => {
  return (
    <div className="beauty-ad-card">
      <div className="ad-header">
        <span className="sparkle">✨</span>
        Góc làm đẹp cho nàng mọt truyện
        <span className="sparkle">✨</span>
      </div>

      <div className="ad-image-container">
        <img
          src={imageUrl}
          alt="Bút kẻ mắt Perfect Diary chống thấm nước"
          className="ad-eye-image"
        />
        <div className="ad-overlay">
          <p className="product-name">Bút kẻ mắt PERFECT DIARY chống thấm nước</p>
        </div>
      </div>

      <div className="ad-footer">
        <a
          href={shopeeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          <span>SĂN SALE SHOPEE MALL →</span>
        </a>
      </div>

      <style jsx>{`
        .beauty-ad-card {
          max-width: 380px;
          margin: 20px auto;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          text-align: center;
        }

        .ad-header {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
          color: #fff;
          padding: 12px;
          font-size: 18px;
          font-weight: bold;
        }

        .sparkle {
          font-size: 22px;
          margin: 0 6px;
        }

        .ad-eye-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .ad-image-container {
          position: relative;
        }

        .ad-overlay {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.45);
          color: white;
          padding: 10px;
          font-size: 16px;
          font-weight: 600;
        }

        .product-name {
          margin: 0;
        }

        .ad-footer {
          padding: 15px;
          background: #f8f9fa;
        }

        .cta-button {
          display: inline-block;
          background: #ff6b6b;
          color: white;
          font-weight: bold;
          padding: 12px 24px;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .cta-button:hover {
          background: #ff4757;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
      `}</style>
    </div>
  );
};

export default BeautyAdCard;