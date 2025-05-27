import { useEffect, useState } from 'react';
import '../map.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';

interface Props {
	onRouteClick: () => void;
	onAboutClick: () => void;
	onSDGsClick: () => void;
	onSearchClick: () => void;
	userName: string | null;
	routeMode: boolean;
}

const FloatingMenu = ({
	onRouteClick,
	onAboutClick,
	onSDGsClick,
	onSearchClick,
	userName,
	routeMode,
}: Props) => {
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [progress, setProgress] = useState<any[]>([]);
	const nav = useNavigate();

	const handleRouteClick = () => {
		if (routeMode) {
<<<<<<< HEAD
			window.location.reload();
		} else {
			onRouteClick();
=======
			window.location.reload(); // 結束模式時刷新
		} else {
			onRouteClick(); // 開啟模式
>>>>>>> refs/remotes/origin/master
		}
		setOpen(false);
	};

	useEffect(() => {
		axios
			.get(`https://nukserver.xn--hrr.tw/progress/${userName}`)
			.then((res) => setProgress(res.data));
	}, [modal, userName]);

	return (
		<>
			<Modal show={modal} onClose={() => setModal(false)} title='進度'>
				{progress.map((val) => {
					return <div>{val}</div>;
				})}
			</Modal>
			<div className='floating-button'>
				<button className='fab-main' onClick={() => setOpen(!open)}>
					{open ? '✕' : '≡'}
				</button>
			</div>
			<div className={`fab-options ${open ? 'show' : ''}`}>
				{userName ? (
					<>
						<button
							onClick={() => setModal(true)}
						>{`Hello, ${userName}`}</button>
						<button
							onClick={() => {
								localStorage.clear();
								nav('/');
							}}
						>
							登出
						</button>
					</>
				) : (
					<button onClick={() => nav('/login')}>登入</button>
				)}
				<button onClick={handleRouteClick}>
					🧭 {routeMode ? '結束路線' : '設定路線'}
				</button>
				<button onClick={onSearchClick}>🔍 搜尋地標</button>
				<button onClick={onSDGsClick}>♻️ SDGs 宣導</button>
				<button onClick={onAboutClick}>ℹ️ 關於我們</button>
			</div>
		</>
	);
};

export default FloatingMenu;