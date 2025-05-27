import Button from 'src/components/Button';
import { useNavigate } from 'react-router-dom';
import book from './images/book.png';
import pin from './images/pin.png';

function App() {
	const nav = useNavigate();

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img alt='book' src={book} style={{ width: '200px' }} />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100vh',
					margin: 0,
					padding: 0,
				}}
			>
				<h1 style={{ fontSize: '7rem', margin: 0 }}>校園慢活地圖</h1>
				<h2
					style={{
						fontSize: '3rem',
						margin: 0,
						fontStyle: 'italic',
						fontWeight: 200,
						padding: '10px',
						fontFamily: 'Noto Serif TC',
					}}
				>
					為你而寫❤️❤️
				</h2>
				<Button title='開始探索' onClick={() => nav('/map')} />
			</div>
			<div style={{ display: 'flex', alignItems: 'center', width: '200px' }}>
				<img alt='pin' src={pin} style={{ width: '80px' }} />
			</div>
		</div>
	);
}

export default App;
