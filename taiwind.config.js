/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Chỉ thêm nếu bạn thực sự có folder src/
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ví dụ tùy chỉnh
      colors: { primary: "#2563eb" },
    },
  },
  plugins: [
    // ví dụ: require('@tailwindcss/typography'),
  ],
}