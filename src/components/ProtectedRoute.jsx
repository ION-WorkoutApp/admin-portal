import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
	const token = localStorage.getItem('token');
	// In a real app, also check if the user role is "admin"
	// or verify token claims from a user context.

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

export default ProtectedRoute;
