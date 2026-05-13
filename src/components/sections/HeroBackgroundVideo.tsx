"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HeroVideoClip = {
  src: string;
  poster?: string;
};

const CROSSFADE_MS = 1300;
/** Tailwind `lg` — separate placeholders & sequential slots on large screens. */
const LG_MIN_PX = 1024;

function pickFadeLeadSec(duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0.6;
  const target = CROSSFADE_MS / 1000;
  const capped = Math.min(target, Math.max(duration - 0.12, duration * 0.38));
  return Math.max(0.35, capped);
}

/** `HTMLMediaElement.play()` rejects for policy/abort — not the same as `onError` (bad file). */
function ignorePlayRejection(): void {
  /* intentionally empty */
}

type Props = {
  clips: readonly HeroVideoClip[];
};

function useIsLargeScreen() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_MIN_PX}px)`);
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isLg;
}

/** Three (or n) portrait slots in a row; only one plays at a time, then the next slot. */
function HeroDesktopVideoSlots({
  clips,
  onClipError,
}: {
  clips: readonly HeroVideoClip[];
  onClipError: () => void;
}) {
  const n = clips.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const allowPlaybackRef = useRef(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const setRef = (i: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[i] = el;
  };

  useEffect(() => {
    const onVis = () => {
      allowPlaybackRef.current = !document.hidden;
      const nodes = videoRefs.current;
      if (document.hidden) {
        nodes.forEach((v) => v?.pause());
      } else {
        const v = nodes[activeIndex];
        if (v) void v.play().catch(ignorePlayRejection);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [activeIndex]);

  useEffect(() => {
    const nodes = videoRefs.current;
    nodes.forEach((v, i) => {
      if (!v) return;
      if (i !== activeIndex) {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
      }
    });

    const v = nodes[activeIndex];
    if (!v) return;

    const tryPlay = () => {
      if (!allowPlaybackRef.current) return;
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
      void v.play().catch(ignorePlayRejection);
    };

    if (v.readyState >= 2) tryPlay();
    else {
      v.addEventListener("canplay", tryPlay, { once: true });
      return () => v.removeEventListener("canplay", tryPlay);
    }
  }, [activeIndex]);

  if (n === 0) {
    return <div className="absolute inset-0 bg-brand-950" aria-hidden />;
  }

  return (
    <div className="absolute inset-0 flex h-full min-h-full w-full flex-row bg-brand-950" aria-hidden>
      {clips.map((clip, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={clip.src}
            className="relative h-full min-h-0 min-w-0 flex-1 overflow-hidden transition-opacity duration-[1100ms] ease-in-out"
            style={{
              opacity: isActive ? 1 : 0.4,
            }}
          >
            <video
              ref={setRef(i)}
              className="pointer-events-none absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              src={clip.src}
              poster={clip.poster}
              muted
              playsInline
              preload="auto"
              onEnded={() => {
                setActiveIndex((a) => (i === a ? (a + 1) % n : a));
              }}
              onError={onClipError}
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Hero backdrop: small screens = one full-bleed crossfade sequence; large screens = three
 * separate portrait slots, one clip at a time moving across placeholders.
 */
export default function HeroBackgroundVideo({ clips }: Props) {
  const n = clips.length;
  const isLg = useIsLargeScreen();

  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  const frontIsARef = useRef(true);
  const clipIdxRef = useRef(0);
  const fadingRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotionRef = useRef(false);
  const allowPlaybackRef = useRef(true);

  const [layerOpacity, setLayerOpacity] = useState<[number, number]>([1, 0]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const getFrontBack = useCallback(() => {
    const A = aRef.current;
    const B = bRef.current;
    if (!A || !B) return null;
    return frontIsARef.current
      ? { front: A, back: B, frontIsA: true }
      : { front: B, back: A, frontIsA: false };
  }, []);

  const startFrontPlayback = useCallback(async () => {
    const pair = getFrontBack();
    if (!pair) return;
    const { front, back } = pair;
    back.pause();
    try {
      back.currentTime = 0;
    } catch {
      /* ignore */
    }
    if (!allowPlaybackRef.current) return;
    try {
      await front.play();
    } catch {
      /* Autoplay / interrupt — keep videos mounted; do not treat as load failure. */
    }
  }, [getFrontBack]);

  const finishCrossfade = useCallback(() => {
    const pair = getFrontBack();
    if (!pair) return;
    const { front: outgoing, back: incoming, frontIsA } = pair;

    outgoing.pause();
    try {
      outgoing.currentTime = 0;
    } catch {
      /* ignore */
    }

    clipIdxRef.current = (clipIdxRef.current + 1) % n;
    const bufferIdx = (clipIdxRef.current + 1) % n;
    const buf = clips[bufferIdx];
    if (buf) {
      outgoing.src = buf.src;
      outgoing.poster = buf.poster ?? "";
    }
    outgoing.load();

    frontIsARef.current = !frontIsA;
    fadingRef.current = false;

    if (!allowPlaybackRef.current) return;
    void incoming.play().catch(ignorePlayRejection);
  }, [clips, getFrontBack, n]);

  const tryCrossfade = useCallback(() => {
    if (
      reduceMotionRef.current ||
      !allowPlaybackRef.current ||
      fadingRef.current ||
      loadError
    )
      return;
    const pair = getFrontBack();
    if (!pair) return;
    const { front, back } = pair;
    const d = front.duration;
    const lead = pickFadeLeadSec(d);
    if (!Number.isFinite(front.currentTime) || front.currentTime < d - lead) return;

    fadingRef.current = true;

    void back
      .play()
      .then(() => {
        setLayerOpacity((prev) => (prev[0] === 1 ? [0, 1] : [1, 0]));
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => {
          fadeTimerRef.current = null;
          finishCrossfade();
        }, CROSSFADE_MS);
      })
      .catch(ignorePlayRejection);
  }, [finishCrossfade, getFrontBack, loadError]);

  const onTimeUpdate = useCallback(
    (e: Event) => {
      const el = e.target as HTMLVideoElement;
      const pair = getFrontBack();
      if (!pair || el !== pair.front) return;
      tryCrossfade();
    },
    [getFrontBack, tryCrossfade]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = mq.matches;
      setReduceMotion(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => {
      const allow = !document.hidden;
      allowPlaybackRef.current = allow;
      const A = aRef.current;
      const B = bRef.current;
      if (!A || !B) return;
      if (!allow) {
        A.pause();
        B.pause();
      } else {
        const front = frontIsARef.current ? A : B;
        void front.play().catch(ignorePlayRejection);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (isLg || reduceMotion) return;

    const A = aRef.current;
    const B = bRef.current;
    if (!A || !B || n === 0) return;

    frontIsARef.current = true;
    clipIdxRef.current = 0;
    setLayerOpacity([1, 0]);
    fadingRef.current = false;

    if (n === 1) {
      A.src = clips[0].src;
      A.poster = clips[0]?.poster ?? "";
      B.removeAttribute("src");
      A.load();
    } else {
      A.src = clips[0].src;
      A.poster = clips[0]?.poster ?? "";
      B.src = clips[1].src;
      B.poster = clips[1]?.poster ?? "";
      A.load();
      B.load();
    }

    const onMeta = () => void startFrontPlayback();
    A.addEventListener("loadeddata", onMeta, { once: true });

    return () => {
      A.removeEventListener("loadeddata", onMeta);
    };
  }, [clips, isLg, n, reduceMotion, startFrontPlayback]);

  useEffect(() => {
    if (isLg || reduceMotion || loadError || n < 2) return;
    const A = aRef.current;
    const B = bRef.current;
    if (!A || !B) return;

    A.addEventListener("timeupdate", onTimeUpdate);
    B.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      A.removeEventListener("timeupdate", onTimeUpdate);
      B.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [isLg, loadError, n, onTimeUpdate, reduceMotion]);

  useEffect(
    () => () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    },
    []
  );

  if (n === 0) {
    return <div className="absolute inset-0 bg-brand-950" aria-hidden />;
  }

  if (reduceMotion) {
    const poster = clips[0]?.poster;
    return (
      <div className="absolute inset-0" aria-hidden>
        {poster ? (
          <div
            className="absolute inset-0 bg-brand-950 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-brand-950" />
        )}
        <div className="absolute inset-0 bg-black/45" />
      </div>
    );
  }

  if (isLg && n >= 2) {
    return loadError ? (
      <div className="absolute inset-0 bg-brand-950" aria-hidden />
    ) : (
      <HeroDesktopVideoSlots clips={clips} onClipError={() => setLoadError(true)} />
    );
  }

  if (n === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-brand-950" aria-hidden>
        {loadError ? (
          <div className="absolute inset-0 bg-brand-950" />
        ) : (
          <video
            ref={aRef}
            className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={clips[0].src}
            poster={clips[0]?.poster}
            muted
            playsInline
            loop
            preload="auto"
            autoPlay
            onError={() => setLoadError(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-950" aria-hidden>
      {loadError ? (
        <div className="absolute inset-0 bg-brand-950" />
      ) : (
        <>
          <video
            ref={aRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity ease-in-out motion-reduce:transition-none"
            style={{
              opacity: layerOpacity[0],
              transitionDuration: `${CROSSFADE_MS}ms`,
              zIndex: layerOpacity[0] >= layerOpacity[1] ? 2 : 1,
            }}
            muted
            playsInline
            preload="auto"
            poster={clips[0]?.poster}
            onError={() => setLoadError(true)}
          />
          <video
            ref={bRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity ease-in-out motion-reduce:transition-none"
            style={{
              opacity: layerOpacity[1],
              transitionDuration: `${CROSSFADE_MS}ms`,
              zIndex: layerOpacity[1] > layerOpacity[0] ? 2 : 1,
            }}
            muted
            playsInline
            preload="auto"
            poster={clips[1]?.poster}
            onError={() => setLoadError(true)}
          />
        </>
      )}
    </div>
  );
}
