import Inferno from 'inferno';
import { Link } from 'inferno-router';
import Card from '../tags/card';
import './home.sass';

export default function (props) {
	return (
		<div className="page page__home">
			<Card>
				<h1>Home</h1>
				<p>This is the home page.</p>

				<p>You should check out:</p>
				<nav>
					<Link to="/foo">Foo</Link>
					<Link to="/foo/bar">Foo/Bar</Link>
				</nav>
			</Card>

			<Card>
				<h2>Features:</h2>
				<ul>
					<li>Offline Caching (via `serviceWorker`)</li>
					<li>SASS & Autoprefixer</li>
					<li>Asset Versioning (aka "cache-busting")</li>
					<li>ES2015 (ES6) and ES2016 (ES7) support</li>
					<li>Webpack Bundle Analysis (via `webpack-dashboard`)</li>
					<li>Hot Module Replacement (HMR) for all files</li>
				</ul>
			</Card>
		</div>
	);
}
