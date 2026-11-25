import { useLang } from '../i18n.jsx';

export default function Band() {
  const { tr } = useLang();
  return (
    <div className="band rvl">
      <h2>{tr('Prefer to see it first?')}</h2>
      <p>{tr('Walk into the mill on Miryalaguda–Kodad Road and pick your bag in person.')}</p>
      <a className="btn" href="#visit">{tr('Get directions')}</a>
    </div>
  );
}
