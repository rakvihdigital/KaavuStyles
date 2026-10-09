"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    const register = () => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (element.dataset.motionReady) return;
        element.dataset.motionReady = 'true';
        // Immediately make content visible if near viewport or reduced motion
        if (preference.matches || element.getBoundingClientRect().top < window.innerHeight * 1.25) {
          element.classList.add('motion-visible');
        } else {
          element.classList.add('motion-pending');
          observer.observe(element);
          // Safety timeout to ensure content is never stuck hidden
          setTimeout(() => {
            element.classList.add('motion-visible');
          }, 600);
        }
      });
    };
    const update = () => {
      frame = 0;
      const hero = root.querySelector<HTMLElement>('[data-home-hero]');
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      const offset = preference.matches ? 0 : Math.min(Math.max(-bounds.top, 0), bounds.height);
      root.style.setProperty('--hero-drift', `${offset * 0.14}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onPreference = () => {
      if (preference.matches) {
        root.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('motion-visible'));
      }
      update();
    };
    register();
    update();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    preference.addEventListener('change', onPreference);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      preference.removeEventListener('change', onPreference);
    };
  }, []);

  return <div ref={rootRef} className="home-motion space-y-4 sm:space-y-5 pb-4 sm:pb-5">{children}</div>;
}
