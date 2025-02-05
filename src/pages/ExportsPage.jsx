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

function ExportsPage() {
	const [exportRequests, setExportRequests] = useState([]);

	useEffect(() => {
		async function fetchExports() {
			try {
				const { data } = await axiosInstance.get('/admin/exports');
				setExportRequests(data);
			} catch (error) {
				console.error('Error fetching exports:', error);
			}
		}
		fetchExports();
	}, []);

	return (
		<Container>
			<h2>Export Requests</h2>
			<Table>
				<thead>
					<tr>
						<Th>ID</Th>
						<Th>User</Th>
						<Th>Created At</Th>
						<Th>Status</Th>
					</tr>
				</thead>
				<tbody>
					{exportRequests.map((req) => (
						<tr key={req._id}>
							<Td>{req._id}</Td>
							<Td>{req.user?.email || 'N/A'}</Td>
							<Td>{req.createdAt}</Td>
							<Td>{req.status}</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}

export default ExportsPage;
