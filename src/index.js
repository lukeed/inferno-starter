import Inferno from 'inferno';
import { Router } from 'inferno-router';
import { createBrowserHistory } from 'history';
import './index.sass';
import views from './views';

const history = createBrowserHistory();

const App = () => (
	<Router history={ history }>{ views }</Router>
);

Inferno.render(App(), document.getElementById('root'));

// cache all assets if browser supports serviceworker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && location.protocol === 'https:') {
	navigator.serviceWorker.register('/service-worker.js');
}
