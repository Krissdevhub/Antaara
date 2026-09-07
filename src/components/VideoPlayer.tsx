'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  youtubeUrl: string;
  title: string;
  thumbnailUrl?: string;
  autoPlayOnClick?: boolean;
}

export function getYoutubeEmbedUrl(url: string, autoplay = false): string {
  if (!url) return '';
  let videoId = '';

  try {
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v') || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || '';
    }
  } catch (e) {
    console.error('Invalid URL passed to getYoutubeEmbedUrl', e);
  }

  // Fallback to a placeholder video if ID cannot be extracted
  if (!videoId) {
    videoId = 'dQw4w9WgXcQ';
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1${
    autoplay ? '&autoplay=1' : ''
  }`;
}

export function VideoPlayer({
  youtubeUrl,
  title,
  thumbnailUrl,
  autoPlayOnClick = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(!thumbnailUrl);

  const embedUrl = getYoutubeEmbedUrl(youtubeUrl, isPlaying);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#292625] shadow-lg border border-[#756B67]/20">
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        <div
          onClick={() => setIsPlaying(true)}
          className="group relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden"
        >
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 opacity-90"
            />
          )}

          {/* Dark luxury vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#292625]/80 via-[#292625]/30 to-transparent" />

          {/* Play Trigger */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F4F1EC]/90 text-[#292625] border border-[#C7A45B]/60 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#F4F1EC] transition-all duration-300">
              <Play className="w-7 h-7 md:w-8 md:h-8 fill-current ml-1 text-[#292625]" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F4F1EC] font-sans font-medium bg-[#292625]/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
              Watch Episode
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
