export const VerticalBannerSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full h-32 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  );
};
