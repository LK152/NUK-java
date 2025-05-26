import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const nav = useNavigate();
	const [account, setAccount] = useState('');
	const [pswd, setPassword] = useState('');
	const [data, setData] = useState<{ username: string; password: string }[] | null>(null);

	useEffect(() => {
		axios.get('http://localhost:8080/users').then((res) => setData(res.data))
	}, [])

	const signupapi = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        if (data) data.forEach(({ username, password }) => {
			if (account === username && pswd === password) nav('/login');
		});
		axios.post('http://localhost:8080/auth/register', JSON.stringify({ username: account, pswd }), {
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
					value={pswd}
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
