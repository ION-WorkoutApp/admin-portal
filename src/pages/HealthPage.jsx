import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`;

const StatusText = styled.p`
	font-size: 16px;
`;

function HealthPage() {
	const [healthData, setHealthData] = useState(null);

	useEffect(() => {
		async function fetchHealth() {
			try {
				const { data } = await axiosInstance.get('/admin/health');
				setHealthData(data);
			} catch (error) {
				console.error('Health check failed:', error);
			}
		}
		fetchHealth();
	}, []);

	return (
		<Container>
			<h2>System Health</h2>
			{healthData ? (
				<>
					<StatusText>Status: {healthData.status}</StatusText>
					<StatusText>Database: {healthData.database}</StatusText>
					<StatusText>Uptime: {healthData.uptime}s</StatusText>
				</>
			) : (
				<StatusText>Loading health data...</StatusText>
			)}
		</Container>
	);
}

export default HealthPage;
