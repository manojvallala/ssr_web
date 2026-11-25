import { forwardRef, useCallback } from 'react';

/* <video> with the same attributes as the original page: muted (as a real attribute, which React leaves out),
   no picture-in-picture / casting / download controls, not focusable. Never shows native controls (see CSS). */
const Video = forwardRef(function Video({ children, ...props }, ref) {
  const setRef = useCallback((el) => {
    if (el) {
      el.muted = true;
      el.setAttribute('muted', '');
      el.setAttribute('disablepictureinpicture', '');
      el.setAttribute('disableremoteplayback', '');
      el.setAttribute('x-webkit-airplay', 'deny');
      el.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
    }
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  }, [ref]);
  return (
    <video ref={setRef} tabIndex={-1} muted playsInline {...props}>{children}</video>
  );
});

export default Video;
