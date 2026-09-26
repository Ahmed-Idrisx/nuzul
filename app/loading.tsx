export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"
        role="status"
        aria-label="Loading page"
      />
    </div>
  );
}
