"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface CarouselProps {
  children: ReactNode[];
  itemsToShow: number;
  showArrows: boolean;
  itemClassName?: string;
  arrowIconSize?: string;
}

export default function BrandsCarousel({
  children,
  itemsToShow,
  showArrows,
  itemClassName = "",
  arrowIconSize = "w-5 h-5",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);
  const hasNavigation = showArrows && totalItems > itemsToShow;

  const nextSlide = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!hasNavigation) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
      }
    },
    [hasNavigation, prevSlide, nextSlide]
  );

  // Drag to scroll functionality
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (showArrows) return;

      setIsDragging(true);
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        setDragStart({
          x: e.pageX - scrollContainer.offsetLeft,
          scrollLeft: scrollContainer.scrollLeft,
        });
      }
    },
    [showArrows]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || showArrows) return;

      e.preventDefault();
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - dragStart.x) * 2;
        scrollContainer.scrollLeft = dragStart.scrollLeft - walk;
      }
    },
    [isDragging, showArrows, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!showArrows || !scrollRef.current) return;

    const container = scrollRef.current;
    const itemWidth = container.scrollWidth / totalItems;
    const scrollPosition = currentIndex * itemWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, showArrows, totalItems]);

  // Add global mouse event listeners for drag functionality
  useEffect(() => {
    if (showArrows || !isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - dragStart.x) * 2;
        scrollContainer.scrollLeft = dragStart.scrollLeft - walk;
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, showArrows, dragStart]);

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        ref={carouselRef}
        className="relative w-full h-full"
        role="region"
        aria-label="Brand partners carousel"
        aria-live="polite"
        onKeyDown={handleKeyDown}
        tabIndex={hasNavigation ? 0 : -1}
      >
        {hasNavigation && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous brands"
              className={`absolute -left-19 top-1/2 z-20 transform -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-90 disabled:cursor-not-allowed`}
              type="button"
            >
              <svg
                className={arrowIconSize}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#5400d6"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z"></path>
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label="Next brands"
              className={`absolute -right-19 top-1/2 z-20 transform -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-90 disabled:cursor-not-allowed`}
              type="button"
            >
              <svg
                className={arrowIconSize}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#5400d6"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path>
              </svg>
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className={`flex gap-6 lg:gap-8 h-full overflow-x-auto scrollbar-hide ${
            !showArrows ? "cursor-grab" : ""
          } ${isDragging ? "cursor-grabbing" : ""}`}
          style={{
            scrollBehavior: showArrows ? "auto" : "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={!showArrows ? handleMouseDown : undefined}
          onMouseMove={!showArrows ? handleMouseMove : undefined}
          onMouseUp={!showArrows ? handleMouseUp : undefined}
          onMouseLeave={!showArrows ? handleMouseUp : undefined}
          role="list"
          aria-label="Brand partner logos"
        >
          {children.map((child: ReactNode, index: number) => (
            <React.Fragment key={index}>
              <div
                className={`${itemClassName} flex-shrink-0`}
                style={
                  showArrows
                    ? {
                        minWidth: `${100 / itemsToShow}%`,
                        maxWidth: `${100 / itemsToShow}%`,
                      }
                    : {}
                }
                role="listitem"
              >
                {child}
              </div>
              {index < children.length - 1 && (
                <div
                  className="h-8 w-px bg-gray-300 flex-shrink-0"
                  role="presentation"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Screen reader status update */}
        {hasNavigation && (
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing brands {currentIndex + 1} to{" "}
            {Math.min(currentIndex + itemsToShow, totalItems)} of {totalItems}
          </div>
        )}
      </div>
    </>
  );
}
