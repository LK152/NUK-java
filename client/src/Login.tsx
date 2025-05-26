import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate();
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<form
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
				<div style={{display: 'flex'}}>
					<button onClick={() => nav('/signup')}>註冊</button>
                    <div style={{ margin: '0 20px' }}></div>
					<button type='submit'>登入</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
