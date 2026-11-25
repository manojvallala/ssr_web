import { useLang } from '../i18n.jsx';

const ITEMS = [
  ['01', 'Honest grain', 'Clean, whole kernels with nothing added — just paddy, steam and careful milling.'],
  ['02', 'Modern & hygienic', 'Machine-assisted cleaning, sorting and packing keep every batch consistent.'],
  ['03', 'Rooted locally', 'We work with farmers and families from Miryalaguda, Kodad and the surrounding villages.'],
];

export default function OurPromise() {
  const { tr } = useLang();
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rvl"><h2>{tr('Our promise')}</h2><p>{tr('Three things we never compromise on at SSR.')}</p></div>
        <div className="prom rvl">
          {ITEMS.map(([n, h, p]) => <div key={n}><i>{n}</i><h3>{tr(h)}</h3><p>{tr(p)}</p></div>)}
        </div>
      </div>
    </section>
  );
}
