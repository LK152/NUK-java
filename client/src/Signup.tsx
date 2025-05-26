import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const nav = useNavigate();
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	const signupapi = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios.post('http://localhost:8080/auth/register', JSON.stringify({ username: account, password }), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
        nav('/login');
	};

	return (
		<div>
			<form
				onSubmit={signupapi}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '80vh',
					justifyContent: 'center',
				}}
			>
				<label htmlFor='account'>帳號</label>
				<input
					id='account'
					type='account'
					value={account}
					onChange={(e) => setAccount(e.target.value)}
					required
				/>
				<div style={{ margin: '10px 0' }}></div>
				<label htmlFor='password'>密碼</label>
				<input
					id='password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div style={{ margin: '10px 0' }}></div>
				<button type='submit'>註冊</button>
			</form>
		</div>
	);
};

export default Signup;
