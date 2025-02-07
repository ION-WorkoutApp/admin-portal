import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 250px;
  font-weight: bold;
`;

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  width: auto;
  margin-left: 10px;
  transform: scale(1.2); /* Optional: Makes checkbox slightly larger */
`;

const NumberInput = styled.input.attrs({ type: 'number' })`
  flex: 1;
  padding: 5px;
  max-width: 200px; /* Optional: Limit width for number inputs */
`;

// Update the Input component to be used specifically for text
const TextInput = styled.input.attrs({ type: 'text' })`
  flex: 1;
  padding: 5px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 15px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;
const Th = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: ${({ theme }) => theme.tableHeaderBg || '#eee'};
`;
const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

function PreferencesDashboard() {
	const [preferences, setPreferences] = useState({});
	const [enabledPreferences, setEnabledPreferences] = useState({});
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');

	const fetchPreferences = async () => {
		try {
			const res = await axiosInstance.get('/admin/settings');
			setPreferences(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchEnabledPreferences = async () => {
		try {
			const res = await axiosInstance.get('/admin/settings/enabled');
			setEnabledPreferences(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			await fetchPreferences();
			await fetchEnabledPreferences();
			setLoading(false);
		};
		loadData();
	}, []);

	const handleTextChange = (e, key) => {
		setPreferences((prev) => ({ ...prev, [key]: e.target.value }));
	};

	const handleCheckboxChange = (e, key) => {
		setPreferences((prev) => ({ ...prev, [key]: e.target.checked }));
	};

	const handleNumberChange = (e, key) => {
		const newValue = Number(e.target.value);
		setPreferences((prev) => ({ ...prev, [key]: newValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axiosInstance.put('/admin/settings', preferences);
			setPreferences(res.data);
			setMessage('preferences updated successfully');
			await fetchEnabledPreferences();
		} catch (error) {
			console.error(error);
			setMessage('error updating preferences');
		}
	};

	if (loading) return <Container>loading...</Container>;

	return (
		<Container>
			<h2>preferences dashboard</h2>
			<DashboardContainer>
				<div>
					<h3>All Preferences</h3>
					<Form onSubmit={handleSubmit}>
						{Object.entries(preferences).map(([key, value]) => (
							<FieldRow key={key}>
								<Label htmlFor={key}>{key}</Label>
								{typeof value === 'boolean' ? (
									<CheckboxInput
										id={key}
										checked={value}
										onChange={(e) => handleCheckboxChange(e, key)}
									/>
								) : typeof value === 'number' ? (
									<NumberInput
										id={key}
										value={value}
										onChange={(e) => handleNumberChange(e, key)}
										min="0" // Optional: Add min/max constraints
									/>
								) : (
									<TextInput
										id={key}
										value={value}
										onChange={(e) => handleTextChange(e, key)}
									/>
								)}
							</FieldRow>
						))}
						<Button type="submit">Save Changes</Button>
					</Form>
				</div>
				<div>
					<h3>enabled preferences</h3>
					<Table>
						<thead>
							<tr>
								<Th>preference</Th>
								<Th>value</Th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(enabledPreferences).map(([key, value]) => (
								<tr key={key}>
									<Td>{key}</Td>
									<Td>{String(value)}</Td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</DashboardContainer>
			{message && <p>{message}</p>}
		</Container>
	);
}

export default PreferencesDashboard;
