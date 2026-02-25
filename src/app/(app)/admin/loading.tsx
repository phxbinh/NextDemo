export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-lg">Đang tải dữ liệu...</p>
    </div>
  );
}