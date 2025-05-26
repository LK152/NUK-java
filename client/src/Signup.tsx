import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	const signupapi = () => {
		axios.post('/auth/register', JSON.stringify({ account, password }));
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
