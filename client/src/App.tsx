import Button from 'src/components/Button';
import { useNavigate } from 'react-router-dom';

function App() {
	const nav = useNavigate();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
                margin: 0,
                padding: 0
			}}
		>
			<h1 style={{fontSize: '8rem', margin: 0}}>大標</h1>
			<h2 style={{fontSize: '3rem', margin: 0}}>副標</h2>
			<Button title='進入' onClick={() => nav('/map')} />
		</div>
	);
}

export default App;
