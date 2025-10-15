import { EventCardSkeleton } from "./event-card-skeleton";
import { VerticalBannerSkeleton } from "./vertical-banner-skeleton";

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
