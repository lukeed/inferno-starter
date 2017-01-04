import Inferno from 'inferno';
import './layout.sass';

import Header from './header';

export default function (props) {
	return (
		<div id="app">
			<Header />
			<main id="content">
				{ props.children }
			</main>
		</div>
	);
}
