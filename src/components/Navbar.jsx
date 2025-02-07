import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../theme';

const Nav = styled.nav`
	display: flex;
	gap: 1rem;
	background: ${({ theme }) => theme.backgroundColor};
	padding: 1rem;
	color: ${({ theme }) => theme.textColor};
	align-items: center;
`;

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.primaryColor};
	text-decoration: none;
	font-weight: bold;
	
	&:hover {
		text-decoration: underline;
	}
`;

const StyledButton = styled.button`
	color: ${({ theme }) => theme.textColor};
	background: ${({ theme }) => theme.secondaryColor};
	border: none;
	padding: 5px 10px;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background: ${({ theme }) => theme.secondaryHover};
	}
`;

const RightContainer = styled.div`
	margin-left: auto;
	display: flex;
	gap: 1rem;
`;

function Navbar() {
	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.href = '/login';
	};

	const { toggleTheme } = useTheme();

	return (
		<Nav>
			<StyledLink to="/admin">Dashboard</StyledLink>
			<StyledLink to="/settings">App Settings</StyledLink>
			<StyledLink to="users">Users</StyledLink>
			<StyledLink to="workouts">Workouts</StyledLink>
			<StyledLink to="exports">Export Requests</StyledLink>
			<StyledLink to="audit-logs">Audit Logs</StyledLink>
			<StyledLink to="health">Health</StyledLink>
			<RightContainer>
				<StyledButton onClick={handleLogout}>logout</StyledButton>
				<StyledButton onClick={toggleTheme}>toggle theme</StyledButton>
			</RightContainer>
		</Nav>
	);
}

export default Navbar;
