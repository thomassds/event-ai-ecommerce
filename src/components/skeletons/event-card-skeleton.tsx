export const EventCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>

      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>

        {/* Date Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Location Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
