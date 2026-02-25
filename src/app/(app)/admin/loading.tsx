/*
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-lg">Đang tải dữ liệu...</p>
    </div>
  );
}
*/


export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start pt-16 sm:pt-24 bg-white/80 z-50">
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="ml-4 text-lg sm:text-xl font-medium text-gray-700">
          Đang tải dữ liệu...
        </p>
      </div>
    </div>
  );
}