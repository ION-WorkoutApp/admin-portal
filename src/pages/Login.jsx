import React, { useState } from 'react';
import { login } from '../api/authApi';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.backgroundColor || '#f0f2f5'};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.cardBackground || '#fff'};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primaryColor || '#333'};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryColor || '#333'};
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorder || '#ccc'};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  color: black;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor || '#007bff'};
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.primaryColor || '#007bff'};
  color: ${({ theme }) => theme.buttonTextColor || '#fff'};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover || '#0056b3'};
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleLogin(e) {
		e.preventDefault();
		try {
			setError('');
			const { data } = await login(email, password);
			localStorage.setItem('token', data.token);
			localStorage.setItem('refreshToken', data.refreshToken);
			window.location.href = '/admin';
		} catch (err) {
			setError(err.response?.data?.message || 'login failed.');
		}
	}

	return (
		<PageWrapper>
			<Container>
				<Title>login</Title>
				<Form onSubmit={handleLogin}>
					<Label>email:</Label>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<Label>password:</Label>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Button type="submit">login</Button>
				</Form>
				{error && <ErrorText>{error}</ErrorText>}
			</Container>
		</PageWrapper>
	);
}

export default Login;
