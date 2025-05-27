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
	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [modal3, setModal3] = useState(false);
	const [progress, setProgress] = useState<any[]>([]);
	const nav = useNavigate();

	const handleRouteClick = () => {
		if (routeMode) {
			window.location.reload(); // 結束模式時刷新
		} else {
			onRouteClick(); // 開啟模式
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
			<Modal show={modal1} onClose={() => setModal1(false)} title='進度'>
				{progress.map((val) => {
					return <div>{val}</div>;
				})}
			</Modal>
			<Modal show={modal2} onClose={() => setModal2(false)} title='♻️ SDGs 宣導'>
				<div>
					人人健康是永續的根本，安全城市是幸福的起點。落實SDG3與SDG11，共創健康生活、宜居環境，讓未來更美好！
				</div>;
			</Modal>
			<Modal show={modal3} onClose={() => setModal3(false)} title='ℹ️ 關於我們'>
				<div>
					這是我們用無數個日夜，在分不清汗水還是淚水的臉上，產生出來的作品。仰賴的是四位組員希望可以推廣SDGS的心情(當然還有分數)，如果有看到我們的努力，我們接受現金斗內
				</div>
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
				<button onClick={() => setModal2(true)}>♻️ SDGs 宣導</button>
				<button onClick={() => setModal3(true)}>ℹ️ 關於我們</button>
			</div>
		</>
	);
};

export default FloatingMenu;
