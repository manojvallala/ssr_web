import { SYMBOLS } from '../data/icons.js';

/* hidden sprite with every icon; use <Icon name="phone" /> anywhere */
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false"
      dangerouslySetInnerHTML={{ __html: SYMBOLS }} />
  );
}

export function Icon({ name, className = 'ic', style }) {
  return (
    <svg className={className} style={style} aria-hidden="true" focusable="false"><use href={`#i-${name}`} /></svg>
  );
}
