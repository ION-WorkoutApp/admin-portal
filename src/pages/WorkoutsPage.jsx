import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	border: 1px solid black;
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

const Pre = styled.pre`
	white-space: pre-wrap;
	word-wrap: break-word;
	background-color: #f4f4f4;
	padding: 5px;
	border-radius: 5px;
`;

function WorkoutsPage() {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		async function getWorkouts() {
			try {
				const { data } = await axiosInstance.get('/admin/workouts');
				setWorkouts(data);
			} catch (error) {
				console.error('Error fetching workouts:', error);
			}
		}
		getWorkouts();
	}, []);

	return (
		<Container>
			<h2>Workouts</h2>
			<Table>
				<thead>
					<tr>
						<Th>ID</Th>
						<Th>User</Th>
						<Th>Workout Data</Th>
					</tr>
				</thead>
				<tbody>
					{workouts.map((w) => (
						<tr key={w._id}>
							<Td>{w._id}</Td>
							<Td>{w.user?.email || 'N/A'}</Td>
							<Td>
								<Pre>{JSON.stringify(w, null, 2)}</Pre>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}

export default WorkoutsPage;
