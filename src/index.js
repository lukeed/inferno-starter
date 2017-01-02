import Inferno from 'inferno';
import App from './tags/app';
import './index.sass';

Inferno.render(<App />, document.getElementById('app'));

// cache all assets if browser supports serviceworker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && location.protocol === 'https:') {
	navigator.serviceWorker.register('/service-worker.js');
}
