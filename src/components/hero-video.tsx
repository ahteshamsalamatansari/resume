"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js/light";
import { INTRO_VIDEO } from "@/config/site";

type Conn = { saveData?: boolean; effectiveType?: string };

/**
 * Intro video in the hero. The poster renders straight away; the stream is
 * adaptive HLS in 2-second chunks, and its first chunks are fetched after the
 * visitor's first scroll, tap or key press, so pressing play starts without a wait.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const warming = useRef<Promise<void> | null>(null);
  const [playing, setPlaying] = useState(false);

  function warm() {
    if (warming.current) return warming.current;
    const video = videoRef.current!;
    warming.current = (async () => {
      // hls.js comes first even where HLS plays natively (Safari, newer Chrome):
      // native players pick quality from bandwidth alone and ignore the player size.
      const { default: HlsJs } = await import("hls.js/light");
      if (!HlsJs.isSupported()) {
        video.preload = "auto";
        video.src = video.canPlayType("application/vnd.apple.mpegurl") ? INTRO_VIDEO.hls : INTRO_VIDEO.mp4;
        return;
      }
      // Before play, buffer only the opening seconds (maxMaxBufferLength is the hard
      // ceiling; hls.js stretches maxBufferLength on low bitrates). play() lifts both.
      const hls = new HlsJs({ maxBufferLength: 4, maxMaxBufferLength: 4 });
      // Cap quality to the player's pixel width (hls.js's own capping only runs while
      // the player is on screen), and lift the cap in fullscreen.
      const cap = () => {
        if (document.fullscreenElement) return void (hls.autoLevelCapping = -1);
        const px = video.clientWidth * window.devicePixelRatio;
        const i = hls.levels.findIndex((l) => l.width >= px);
        hls.autoLevelCapping = i === -1 ? hls.levels.length - 1 : i;
      };
      hls.on(HlsJs.Events.MANIFEST_PARSED, cap);
      document.addEventListener("fullscreenchange", cap);
      hls.on(HlsJs.Events.DESTROYING, () => document.removeEventListener("fullscreenchange", cap));
      hls.on(HlsJs.Events.ERROR, (_e, data) => {
        if (!data.fatal) return;
        hls.destroy();
        hlsRef.current = null;
        video.src = INTRO_VIDEO.mp4;
      });
      hls.loadSource(INTRO_VIDEO.hls);
      hls.attachMedia(video);
      hlsRef.current = hls;
    })();
    return warming.current;
  }

  // Warm up on the visitor's first interaction rather than at load, so the
  // player script never competes with the first render.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"] as const;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const onFirst = () => {
      events.forEach((e) => window.removeEventListener(e, onFirst));
      idle(() => void warm(), { timeout: 2000 });
    };
    if (!conn?.saveData && !/2g/.test(conn?.effectiveType ?? "")) {
      events.forEach((e) => window.addEventListener(e, onFirst, { once: true, passive: true }));
    }
    return () => {
      events.forEach((e) => window.removeEventListener(e, onFirst));
      hlsRef.current?.destroy();
    };
  }, []);

  async function play() {
    await warm();
    if (hlsRef.current) Object.assign(hlsRef.current.config, { maxBufferLength: 30, maxMaxBufferLength: 600 });
    setPlaying(true);
    const video = videoRef.current!;
    video.preload = "auto";
    video.focus();
    await video.play().catch(() => undefined);
  }

  return (
    <figure className="w-full">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_18px_40px_-24px_rgba(34,34,34,0.45)]">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full"
          preload="none"
          playsInline
          controls={playing}
          aria-label={INTRO_VIDEO.title}
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            onPointerEnter={() => void warm()}
            onFocus={() => void warm()}
            onTouchStart={() => void warm()}
            className="group absolute inset-0 block size-full cursor-pointer"
            aria-label={`Play ${INTRO_VIDEO.title} (${INTRO_VIDEO.durationLabel})`}
          >
            <Image
              src={INTRO_VIDEO.poster}
              width={1280}
              height={720}
              alt=""
              loading="eager"
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
              className="size-full object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-white sm:size-20"
            >
              <Play className="ml-1 size-7 fill-current sm:size-8" />
            </span>
            <span
              aria-hidden
              className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-white"
            >
              {INTRO_VIDEO.durationLabel}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        <span className="font-semibold text-ink">Watch my intro</span> · what I build and how I work, with captions
      </figcaption>
    </figure>
  );
}
