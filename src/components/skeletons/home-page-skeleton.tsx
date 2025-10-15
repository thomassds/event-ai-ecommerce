import { EventCardSkeleton } from "./event-card-skeleton";

export const HomePageSkeleton = () => {
  return (
    <div className="space-y-4 pb-10 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-75 bg-gray-200 rounded-lg" />

      {/* Categories Skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg" />

      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Featured Events Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
