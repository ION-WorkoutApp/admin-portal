// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UsersPage from './pages/UsersPage';
import WorkoutsPage from './pages/WorkoutsPage';
import ExportsPage from './pages/ExportsPage';
import AuditLogsPage from './pages/AuditLogsPage';
import HealthPage from './pages/HealthPage';
import SettingsPage from './pages/SettingsPage'

import ProtectedRoute from './components/ProtectedRoute';
import { CustomThemeProvider } from './theme';
import GlobalStyles from './GlobalStyles';
import Layout from './layout';

function App() {
	return (
		<CustomThemeProvider>
			<GlobalStyles />
			<Router>
				<Layout>
					<Routes>
						<Route path="/login" element={<Login />} />

						{/* Protected admin routes */}
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/settings"
							element={
								<ProtectedRoute>
									<SettingsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/users"
							element={
								<ProtectedRoute>
									<UsersPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/workouts"
							element={
								<ProtectedRoute>
									<WorkoutsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/exports"
							element={
								<ProtectedRoute>
									<ExportsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/audit-logs"
							element={
								<ProtectedRoute>
									<AuditLogsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/health"
							element={
								<ProtectedRoute>
									<HealthPage />
								</ProtectedRoute>
							}
						/>

						{/* Fallback */}
						<Route path="*" element={<Login />} />
					</Routes>
				</Layout>
			</Router>
		</CustomThemeProvider>
	);
}

export default App;
