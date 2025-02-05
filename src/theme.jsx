import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';


export const lightTheme = {
	primaryColor: '#3498db',
	secondaryColor: '#2ecc71',
	backgroundColor: '#f5f5f5',
	textColor: '#333',
	borderColor: '#ddd',
	errorColor: '#e74c3c',
};

export const darkTheme = {
	primaryColor: '#2980b9',
	secondaryColor: '#27ae60',
	backgroundColor: '#2c3e50',
	textColor: '#ecf0f1',
	borderColor: '#34495e',
	errorColor: '#c0392b',
};

const ThemeContext = createContext({
	theme: 'dark',
	toggleTheme: () => { }
});

export const CustomThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		// initialize theme from localstorage if it exists
		const storedTheme = localStorage.getItem('theme');
		return storedTheme ? storedTheme : 'light';
	});

	useEffect(() => {
		// update localstorage whenever theme changes
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
	};

	// select theme object based on the theme string
	const themeObject = theme === 'light' ? lightTheme : darkTheme;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ThemeProvider theme={themeObject}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
