export const EventDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <div className="animate-pulse mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div className="h-64 md:h-96 bg-gray-200 rounded-lg animate-pulse mb-8"></div>

      <div className="md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
);
