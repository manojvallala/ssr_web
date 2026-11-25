import { useLang } from '../i18n.jsx';
import { Icon } from './Icons.jsx';

const ITEMS = [['award', '28 years', 'of experience in the rice field'], ['leaf', '100% natural', 'No additives, ever'], ['star', 'Premium grain', 'Sorted & graded'], ['package', 'Freshly packed', 'Sealed at the mill']];

export default function Trust() {
  const { tr } = useLang();
  return (
    <div className="trust rvl">
      {ITEMS.map(([icon, b, s]) => (
        <div className="tr" key={icon}><i><Icon name={icon} /></i><div><b>{tr(b)}</b><small>{tr(s)}</small></div></div>
      ))}
    </div>
  );
}
