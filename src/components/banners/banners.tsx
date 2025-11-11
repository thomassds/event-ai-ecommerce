"use client";
import { Banner } from "@/interfaces/banner";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface BannersProps {
  banners: Banner[];
  intervalTime?: number;
  autoPlay?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Banners({
  banners,
  intervalTime = 5000,
  autoPlay = true,
  className = "",
  ariaLabel = "Banner carousel",
}: BannersProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [banners.length, intervalTime, autoPlay]);

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentBannerIndex];

  const BannerContent = () => (
    <div className={`relative w-full h-[280px] md:h-[400px] ${className}`}>
      <Image
        src={currentBanner.url}
        alt={currentBanner.alt || "Banner promocional"}
        title={currentBanner.title || currentBanner.alt || "Banner promocional"}
        fill
        className="object-cover object-center transition-opacity duration-500"
        quality={100}
        priority={currentBanner.priority || currentBannerIndex === 0}
        sizes="(max-width: 768px) 100vw, 100vw"
        unoptimized
      />

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((banner, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentBannerIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBannerIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to ${banner.alt}`}
              title={banner.title || banner.alt}
            />
          ))}
        </div>
      )}

      {currentBanner.description && (
        <span className="sr-only">{currentBanner.description}</span>
      )}
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      {currentBanner.link ? (
        <Link
          href={currentBanner.link}
          className="block"
          title={currentBanner.title || currentBanner.alt}
        >
          <BannerContent />
        </Link>
      ) : (
        <BannerContent />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            url: currentBanner.url,
            name: currentBanner.alt,
            description: currentBanner.description || currentBanner.alt,
            contentUrl: currentBanner.url,
          }),
        }}
      />
    </section>
  );
}
