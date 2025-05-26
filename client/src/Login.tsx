import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const nav = useNavigate();
	const [account, setAccount] = useState('');
	const [pswd, setPassword] = useState('');
	const [incorrect, setIncorrect] = useState(false);
	const [data, setData] = useState<
		{ username: string; password: string }[] | null
	>(null);

	useEffect(() => {
		axios
			.get('http://localhost:8080/auth/users')
			.then((res) => setData(res.data));
	}, []);

	const auth = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (data) {
			data.forEach(({ username, password }) => {
				if (account === username && pswd === password) {
					nav('/');
					setIncorrect(false);
				} else setIncorrect(true);
			});
		}
	};

	return (
		<form
			onSubmit={auth}
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
			<div style={{ display: 'flex' }}>
				<button onClick={() => nav('/signup')}>註冊</button>
				<div style={{ margin: '0 20px' }}></div>
				<button type='submit'>登入</button>
			</div>
			{incorrect ? (
				<div style={{ color: 'red' }}>帳號或密碼錯誤</div>
			) : (
				<div></div>
			)}
		</form>
	);
};

export default Login;
