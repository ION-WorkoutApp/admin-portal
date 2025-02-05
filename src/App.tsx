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
							path="/admin/users"
							element={
								<ProtectedRoute>
									<UsersPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/workouts"
							element={
								<ProtectedRoute>
									<WorkoutsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/exports"
							element={
								<ProtectedRoute>
									<ExportsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/audit-logs"
							element={
								<ProtectedRoute>
									<AuditLogsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/health"
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
