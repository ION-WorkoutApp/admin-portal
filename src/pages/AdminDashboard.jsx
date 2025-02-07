import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ModuleCard = styled(Link)`
  display: block;
  text-decoration: none;
  background: ${({ theme }) => theme.cardBackground || '#fff'};
  border: 1px solid ${({ theme }) => theme.cardBorder || '#ccc'};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.primaryColor || '#333'};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ModuleTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ModuleSubtitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

function AdminDashboard() {
	return (
		<Container>
			<Title>welcome to the admin dashboard</Title>
			<Grid>
				<ModuleCard to="users">
					<ModuleTitle>users</ModuleTitle>
					<ModuleSubtitle>manage application users</ModuleSubtitle>
				</ModuleCard>
				<ModuleCard to="workouts">
					<ModuleTitle>workouts</ModuleTitle>
					<ModuleSubtitle>manage workouts and exercises</ModuleSubtitle>
				</ModuleCard>
				<ModuleCard to="exports">
					<ModuleTitle>export requests</ModuleTitle>
					<ModuleSubtitle>review and manage export requests</ModuleSubtitle>
				</ModuleCard>
				<ModuleCard to="audit-logs">
					<ModuleTitle>audit logs</ModuleTitle>
					<ModuleSubtitle>view system audit logs</ModuleSubtitle>
				</ModuleCard>
				<ModuleCard to="health">
					<ModuleTitle>health</ModuleTitle>
					<ModuleSubtitle>monitor system health</ModuleSubtitle>
				</ModuleCard>
			</Grid>
		</Container>
	);
}

export default AdminDashboard;
