import React, { useCallback, useEffect, useState } from 'react';
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

const Button = styled.button`
	margin-top: 10px;
	padding: 5px 10px;
	background-color: red;
	color: white;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: darkred;
	}
`;

function UsersPage() {
	const [users, setUsers] = useState([]);
	const [nextCursor, setNextCursor] = useState(null);
	const [limit] = useState(20);

	const fetchUsers = useCallback(async (cursor) => {
		try {
			let url = `/admin/users?limit=${limit}`;
			if (cursor) {
				url += `&after=${cursor}`;
			}
			const { data } = await axiosInstance.get(url);
			setUsers((prev) => [...prev, ...data.data]);
			setNextCursor(data.nextCursor);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	}, [limit]);

	useEffect(() => {
		setUsers([]);
		fetchUsers();
	}, [fetchUsers]);

	const loadMore = () => {
		if (nextCursor) {
			fetchUsers(nextCursor);
		}
	};

	const handleDeleteUser = async (userId) => {
		if (!window.confirm('Are you sure you want to soft-delete this user?')) return;
		try {
			await axiosInstance.delete(`/admin/users/${userId}`);
			setUsers(users.filter((u) => u._id !== userId));
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	return (
		<Container>
			<h2>Users</h2>
			<Table>
				<thead>
					<tr>
						<Th>ID</Th>
						<Th>Name</Th>
						<Th>Email</Th>
						<Th>Actions</Th>
					</tr>
				</thead>
				<tbody>
					{users.map((u) => (
						<tr key={u._id}>
							<Td>{u._id}</Td>
							<Td>{u.name}</Td>
							<Td>{u.email}</Td>
							<Td>
								<Button onClick={() => handleDeleteUser(u._id)}>Soft Delete</Button>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
			{nextCursor && <Button onClick={loadMore}>Load More</Button>}
		</Container>
	);
}

export default UsersPage;
