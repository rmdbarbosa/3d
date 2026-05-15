"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { HashLink } from "@/components/shared/HashLink";

const TARGET_TOP = 20;
const TARGET_LEFT = 20;
const TARGET_SIZE = 48;
const TRANSITION_DISTANCE = 190;

type LogoMetrics = {
  documentTop: number;
  left: number;
  size: number;
};

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function getInterpolatedValue(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getLogoStyle(metrics: LogoMetrics): CSSProperties {
  const scrollY = window.scrollY;
  const progress = clampProgress(scrollY / TRANSITION_DISTANCE);
  const naturalTop = metrics.documentTop - scrollY;
  const size = getInterpolatedValue(metrics.size, TARGET_SIZE, progress);

  return {
    borderRadius: 2,
    height: size,
    left: getInterpolatedValue(metrics.left, TARGET_LEFT, progress),
    objectFit: "cover",
    position: "fixed",
    top: getInterpolatedValue(naturalTop, TARGET_TOP, progress),
    width: size,
    willChange: "top, left, width, height",
    zIndex: 40,
  };
}

export function HeroLogo() {
  const logoSlotRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [logoStyle, setLogoStyle] = useState<CSSProperties | null>(null);

  useEffect(() => {
    const updateLogoStyle = () => {
      const logoSlot = logoSlotRef.current;

      if (!logoSlot) {
        return;
      }

      const rect = logoSlot.getBoundingClientRect();
      const metrics = {
        documentTop: rect.top + window.scrollY,
        left: rect.left,
        size: rect.width,
      };

      setLogoStyle(getLogoStyle(metrics));
    };

    const scheduleLogoUpdate = () => {
      if (animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null;
        updateLogoStyle();
      });
    };

    updateLogoStyle();
    window.addEventListener("scroll", scheduleLogoUpdate, { passive: true });
    window.addEventListener("resize", scheduleLogoUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleLogoUpdate);
      window.removeEventListener("resize", scheduleLogoUpdate);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="mb-6 h-[72px] w-[72px] sm:h-[88px] sm:w-[88px]"
      ref={logoSlotRef}
    >
      <HashLink aria-label="Voltar ao início" href="#inicio">
        <Image
          alt="fourverticals 3D"
          className="rounded-sm object-cover shadow-[0_18px_46px_rgba(0,0,0,0.58),0_0_36px_rgba(255,255,255,0.12)]"
          height={88}
          priority
          src="/images/logo.webp"
          style={logoStyle ?? undefined}
          width={88}
        />
      </HashLink>
    </div>
  );
}
