import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`;

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
	width: 100%;
`;

const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  background-color: ${({ theme }) => theme.tableHeaderBg}; /* Make it dynamic */
  color: ${({ theme }) => theme.textColor}; /* Ensure text is readable */
`;

const Td = styled.td`
	border: 1px solid black;
	padding: 8px;
`;

const ErrorText = styled.p`
	color: red;
`;

function AuditLogsPage() {
	const [logs, setLogs] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchLogs() {
			try {
				const { data } = await axiosInstance.get('/admin/audit-logs');
				setLogs(data);
			} catch (err) {
				setError(err.response?.status === 403 ? 'You are not authorized to view audit logs.' : 'Error fetching logs.');
			}
		}
		fetchLogs();
	}, []);

	return (
		<Container>
			<h2>Audit Logs</h2>
			{error ? <ErrorText>{error}</ErrorText> : (
				<Table>
					<thead>
						<tr>
							<Th>Admin</Th>
							<Th>Action</Th>
							<Th>Target User</Th>
							<Th>Timestamp</Th>
						</tr>
					</thead>
					<tbody>
						{logs.map((log) => (
							<tr key={log._id}>
								<Td>{log.admin?.email}</Td>
								<Td>{log.action}</Td>
								<Td>{log.targetUser?.email || 'N/A'}</Td>
								<Td>{new Date(log.timestamp).toLocaleString()}</Td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Container>
	);
}

export default AuditLogsPage;
