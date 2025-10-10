export const EventsPageSkeleton = () => {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="w-full mx-auto flex flex-col gap-4">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded"></div>

        {/* Breadcrumb Skeleton */}
        <div className="py-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <span className="text-gray-300">|</span>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          {/* Events Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>

          {/* Vertical Banner Skeleton */}
          <div className="hidden xl:block w-60">
            <VerticalBannerSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
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

const VerticalBannerSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full h-32 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  );
};
