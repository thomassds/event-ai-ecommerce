"use client";

import { useState, memo } from "react";
import {
  SpinnerGapIcon,
  XCircleIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

interface EventVideoProps {
  videoUrl: string;
  thumbnailUrl: string;
  title?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const EventVideoCard = memo(
  ({
    videoUrl,
    thumbnailUrl,
    title,
    isLoading = false,
    error = null,
  }: EventVideoProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayVideo = () => {
      setIsPlaying(true);
    };

    if (isLoading) {
      return (
        <div className="px-4 md:px-6 lg:px-0 mt-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <SpinnerGapIcon size={32} className="animate-spin text-white" />
                <span className="ml-2 text-white">Carregando vídeo...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="px-4 md:px-6 lg:px-0 mt-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center text-red-400">
                <XCircleIcon size={24} />
                <span className="ml-2">{error}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="px-0 md:px-6 lg:px-0 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-gray-900">
              {!isPlaying ? (
                <>
                  <Image
                    src={thumbnailUrl}
                    width={1000}
                    height={1000}
                    alt={title || "Thumbnail do vídeo"}
                    className="w-full h-full object-cover"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button
                      onClick={handlePlayVideo}
                      className="cursor-pointer"
                      aria-label="Reproduzir vídeo"
                    >
                      <YoutubeLogoIcon className="w-21 h-21" />
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${videoUrl}?autoplay=1`}
                  title={title || "Vídeo promocional do evento"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.videoUrl === nextProps.videoUrl &&
      prevProps.thumbnailUrl === nextProps.thumbnailUrl &&
      prevProps.title === nextProps.title &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.error === nextProps.error
    );
  }
);

EventVideoCard.displayName = "EventVideoCard";
