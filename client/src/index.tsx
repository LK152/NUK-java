import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Map from './Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Login from './Login';
import Signup from './Signup';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/map' element={<Map />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
