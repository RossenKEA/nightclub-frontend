"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

const tracks = [
  {
    id: 1,
    title: "Carnaval",
    artist: "Alec Koff",
    src: "/audio/alec_koff-carnaval-484622.mp3",
    imagePath: "/file-bucket/gallery5_big.jpg",
    imageAlt: "Guitarist on dark club stage",
  },
  {
    id: 2,
    title: "Escape Your Love",
    artist: "Fassounds",
    src: "/audio/fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3",
    imagePath: "/file-bucket/gallery3_big.jpg",
    imageAlt: "Female singer under blue and pink lights",
  },
  {
    id: 3,
    title: "Medicine",
    artist: "Gvidon",
    src: "/audio/gvidon-gvidon-medicine-364031.mp3",
    imagePath: "/file-bucket/gallery8_big.jpg",
    imageAlt: "Saxophonist under blue stage lights",
  },
  {
    id: 4,
    title: "Acoustic Spring",
    artist: "Ikoliks AJ",
    src: "/audio/ikoliks_aj-acoustic-spring-mothers-day-music-320427.mp3",
    imagePath: "/file-bucket/gallery11_big.jpg",
    imageAlt: "Female vocalist on stage",
  },
  {
    id: 5,
    title: "Water",
    artist: "Kontraa",
    src: "/audio/kontraa-water-afro-pop-music-445661.mp3",
    imagePath: "/file-bucket/gallery10_big.jpg",
    imageAlt: "Bearded guitarist under purple lights",
  },
];

function formatTime(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoPlayRef = useRef(false);

  const currentTrack = tracks[currentIndex];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    if (shouldAutoPlayRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function getNextIndex(from: number) {
    if (isShuffle) {
      let next = from;
      while (next === from && tracks.length > 1) {
        next = Math.floor(Math.random() * tracks.length);
      }
      return next;
    }
    return (from + 1) % tracks.length;
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      shouldAutoPlayRef.current = true;
      audio.play().catch(() => {});
    }
  }

  function handlePrev() {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    shouldAutoPlayRef.current = isPlaying;
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }

  function handleNext() {
    shouldAutoPlayRef.current = isPlaying;
    setCurrentIndex((i) => getNextIndex(i));
  }

  function handleTrackEnd() {
    shouldAutoPlayRef.current = true;
    setCurrentIndex((i) => getNextIndex(i));
  }

  function selectTrack(index: number) {
    if (index === currentIndex) {
      togglePlay();
      return;
    }
    shouldAutoPlayRef.current = true;
    setCurrentIndex(index);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio) audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          e.currentTarget.volume = volume;
        }}
        onEnded={handleTrackEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      {/* Title */}
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
          Night Club Track
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-pink-500" />
      </div>

      {/* Main player */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Artist image */}
        <div className="relative h-72 w-72 shrink-0 overflow-hidden">
          <Image
            src={`${API}${currentTrack.imagePath}`}
            alt={currentTrack.imageAlt}
            fill
            className="object-cover"
            sizes="288px"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-[0.2em]">
              {currentTrack.title}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-wider text-pink-500">
              {currentTrack.artist}
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="relative h-1 w-full cursor-pointer bg-white/20">
              <div
                className="pointer-events-none absolute left-0 top-0 h-full bg-pink-500"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-pink-500"
                style={{ left: `calc(${progressPercent}% - 6px)` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Seek"
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Buttons + volume */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous"
              className="text-white/70 transition-colors hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
            >
              <SkipPrevIcon />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white transition-colors hover:border-pink-500 hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next"
              className="text-white/70 transition-colors hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
            >
              <SkipNextIcon />
            </button>

            <button
              type="button"
              onClick={() => setIsShuffle((s) => !s)}
              aria-label="Toggle shuffle"
              aria-pressed={isShuffle}
              className={`transition-colors hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 ${
                isShuffle ? "text-pink-500" : "text-white/40"
              }`}
            >
              <ShuffleIcon />
            </button>

            {/* Volume */}
            <div className="ml-auto flex items-center gap-3 text-white/60">
              <VolumeIcon />
              <div className="relative h-1 w-24 bg-white/20">
                <div
                  className="pointer-events-none absolute left-0 top-0 h-full bg-white/60"
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 w-full cursor-pointer opacity-0"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track gallery */}
      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous track"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-pink-500 hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
        >
          ‹
        </button>

        <div className="flex flex-1 gap-2 overflow-hidden">
          {tracks.map((track, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => selectTrack(index)}
                aria-label={`Play ${track.title}`}
                className={`group relative h-28 flex-1 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 ${
                  isActive ? "ring-1 ring-inset ring-pink-500" : ""
                }`}
              >
                <Image
                  src={`${API}${track.imagePath}`}
                  alt={track.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="20vw"
                />
                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/50" />
                {isActive && (
                  <>
                    <div className="absolute bottom-0 left-0 h-0 w-0 border-b-[28px] border-l-[28px] border-b-transparent border-l-pink-500" />
                    <p className="absolute bottom-2 right-2 text-[10px] font-bold uppercase tracking-wider text-white drop-shadow">
                      {track.title.length > 12
                        ? `${track.title.slice(0, 12)}…`
                        : track.title}
                    </p>
                  </>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next track"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-pink-500 hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
        >
          ›
        </button>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SkipPrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function SkipNextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  );
}
