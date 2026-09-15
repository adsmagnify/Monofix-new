"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import "./PixelTransition.css";

type PixelTransitionProps = {
  firstContent: ReactNode | string;
  secondContent: ReactNode | string;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  fill?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  contentKey?: string | number;
  onForwardComplete?: () => void;
};

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style = {},
  fill = false,
  autoPlay = false,
  autoPlayInterval = 5200,
  contentKey,
  onForwardComplete,
}: PixelTransitionProps) {
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);
  const isActiveRef = useRef(false);
  const onForwardCompleteRef = useRef(onForwardComplete);
  const [isActive, setIsActive] = useState(false);
  const [touch, setTouch] = useState(false);

  onForwardCompleteRef.current = onForwardComplete;
  isActiveRef.current = isActive;

  useEffect(() => {
    setTouch("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.replaceChildren();

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.style.backgroundColor = pixelColor;
        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = useCallback(
    (activate: boolean) => {
      setIsActive(activate);
      isActiveRef.current = activate;

      const pixelGridEl = pixelGridRef.current;
      const activeEl = activeRef.current;
      if (!pixelGridEl || !activeEl) return;

      const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(".pixelated-image-card__pixel");
      if (!pixels.length) return;

      gsap.killTweensOf(pixels);
      delayedCallRef.current?.kill();
      gsap.set(pixels, { display: "none" });

      const staggerDuration = animationStepDuration / pixels.length;

      gsap.to(pixels, {
        display: "block",
        duration: 0,
        stagger: { each: staggerDuration, from: "random" },
      });

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        activeEl.style.display = activate ? "block" : "none";
        activeEl.style.pointerEvents = activate ? "none" : "";
      });

      gsap.to(pixels, {
        display: "none",
        duration: 0,
        delay: animationStepDuration,
        stagger: { each: staggerDuration, from: "random" },
        onComplete: () => {
          if (activate) onForwardCompleteRef.current?.();
          else busyRef.current = false;
        },
      });
    },
    [animationStepDuration],
  );

  useEffect(() => {
    const activeEl = activeRef.current;
    if (activeEl) {
      activeEl.style.display = "none";
      activeEl.style.pointerEvents = "";
    }
    setIsActive(false);
    isActiveRef.current = false;
    busyRef.current = false;
  }, [contentKey]);

  useEffect(() => {
    if (!autoPlay) return;

    const tick = () => {
      if (busyRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onForwardCompleteRef.current?.();
        return;
      }
      busyRef.current = true;
      animatePixels(true);
    };

    const id = window.setInterval(tick, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, animatePixels]);

  const interactive = !autoPlay && !fill;

  const handleEnter = () => {
    if (!isActiveRef.current) animatePixels(true);
  };
  const handleLeave = () => {
    if (isActiveRef.current && !once) animatePixels(false);
  };
  const handleClick = () => {
    if (!isActiveRef.current) animatePixels(true);
    else if (isActiveRef.current && !once) animatePixels(false);
  };

  return (
    <div
      className={`pixelated-image-card${fill ? " pixelated-image-card--fill" : ""} ${className}`}
      style={style}
      onMouseEnter={interactive && !touch ? handleEnter : undefined}
      onMouseLeave={interactive && !touch ? handleLeave : undefined}
      onClick={interactive && touch ? handleClick : undefined}
      onFocus={interactive && !touch ? handleEnter : undefined}
      onBlur={interactive && !touch ? handleLeave : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {fill ? null : <div style={{ paddingTop: aspectRatio }} />}
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}
