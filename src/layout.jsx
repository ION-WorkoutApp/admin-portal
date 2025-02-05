import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
	const location = useLocation();
	const hideNavbarPaths = ['/login'];

	return (
		<>
			{!hideNavbarPaths.includes(location.pathname) && <Navbar />}
			{children}
		</>
	);
};

export default Layout;
