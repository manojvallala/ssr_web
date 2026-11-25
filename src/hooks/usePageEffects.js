import { useEffect } from 'react';
import { VIDEO_SPEED } from '../data/config.js';

/* fade-in on scroll: every .rvl element gets .in once 10% of it is on screen */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((x) => x.isIntersecting && x.target.classList.add('in')), { threshold: 0.1 });
    document.querySelectorAll('.rvl').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* one speed for all videos, including ones loaded later (loading a source resets the speed, so re-apply on load and play) */
export function useVideoSpeed() {
  useEffect(() => {
    const rate = (v) => {
      if (!v || v.tagName !== 'VIDEO') return;
      v.defaultPlaybackRate = VIDEO_SPEED;
      if (v.playbackRate !== VIDEO_SPEED) v.playbackRate = VIDEO_SPEED;
    };
    const on = (e) => rate(e.target);
    ['loadedmetadata', 'play'].forEach((ev) => document.addEventListener(ev, on, true));
    document.querySelectorAll('video').forEach(rate);
    return () => ['loadedmetadata', 'play'].forEach((ev) => document.removeEventListener(ev, on, true));
  }, []);
}
