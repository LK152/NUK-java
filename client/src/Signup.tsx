import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const nav = useNavigate();
	const [account, setAccount] = useState('');
	const [pswd, setPassword] = useState('');
	const [data, setData] = useState<
		{ username: string; password: string }[] | null
	>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:8080/auth/users')
			.then((res) => setData(res.data))
			.catch((err) => console.error('取得使用者列表失敗', err));
	}, []);

	const signupapi = async () => {
		if (data?.some((u) => u.username === account)) {
			setError('❌ 此帳號已存在');
			return;
		}

		try {
			const res = await axios.post(
				'http://localhost:8080/auth/register',
				{ username: account, password: pswd },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (res.status === 200) {
				alert('✅ 註冊成功，請登入');
				nav('/login');
			}
		} catch (err: any) {
			if (err.response?.status === 409) {
				setError('❌ 帳號已存在');
			} else {
				setError('⚠️ 系統錯誤，請稍後再試');
			}
		}
	};

	return (
		<div>
			<div
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
					type='text'
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
				<button onClick={() => signupapi()}>註冊</button>
				{error && (
					<p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
				)}
				{error && (
					<button onClick={() => nav('/login')}>回登入頁？</button>
				)}
			</div>
		</div>
	);
};

export default Signup;
