import { useState } from 'react';
import '../map.css';
import { useNavigate } from 'react-router-dom';

interface Props {
	onRouteClick: () => void;
	onAboutClick: () => void;
	onSDGsClick: () => void;
	userName: string | null;
	routeMode: boolean; // 新增傳入 routeMode
}

const FloatingMenu = ({
	onRouteClick,
	onAboutClick,
	onSDGsClick,
	userName,
	routeMode,
}: Props) => {
	const [open, setOpen] = useState(false);
	const nav = useNavigate();

	const handleRouteClick = () => {
		if (routeMode) {
			// 結束模式，重整頁面清空點與路線
			window.location.reload();
		} else {
			// 進入模式
			onRouteClick();
		}
		setOpen(false); // 關閉選單
	};

	return (
		<>
			<div className="floating-button">
				<button className="fab-main" onClick={() => setOpen(!open)}>
					{open ? '✕' : '≡'}
				</button>
			</div>

			<div className={`fab-options ${open ? 'show' : ''}`}>
				{userName ? (
					<button disabled>{`Hello, ${userName}`}</button>
				) : (
					<button onClick={() => nav('/login')}>登入</button>
				)}
				<button onClick={handleRouteClick}>
					🧭 {routeMode ? '結束路線' : '設定路線'}
				</button>
				<button onClick={onAboutClick}>ℹ️ 關於我們</button>
				<button onClick={onSDGsClick}>♻️ SDGs 宣導</button>
			</div>
		</>
	);
};

export default FloatingMenu;