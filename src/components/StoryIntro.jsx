import { useLang } from '../i18n.jsx';

export default function StoryIntro() {
  const { tr } = useLang();
  return (
    <section className="sintro" id="story-intro">
      <div className="wrap sh" style={{ margin: 0 }}>
        <span className="tag" style={{ fontSize: '12px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold2)' }}>{tr('Our story')}</span>
        <h2 style={{ marginTop: '12px' }}>{tr('From paddy field to your plate')}</h2>
        <p>{tr('Scroll to follow every grain through ten stages — the way SSR grows, gathers, parboils, mills and delivers rice.')}</p>
      </div>
    </section>
  );
}
