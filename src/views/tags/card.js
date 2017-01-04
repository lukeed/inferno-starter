import Inferno from 'inferno';
import './card.sass';

export default function (props) {
	return <div className="card">{ props.children }</div>
}
