import { useState } from 'react';
import './map.css';

const FloatingMenu = ({
	onRouteClick,
	onAboutClick,
	onSDGsClick,
}: {
	onRouteClick: () => void;
	onAboutClick: () => void;
	onSDGsClick: () => void;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* 固定右上角按鈕 */}
			<div className="floating-button">
				<button className="fab-main" onClick={() => setOpen(!open)}>
					{open ? '✕' : '≡'}
				</button>
			</div>

			{/* 展開選單本體（絕對定位，不會影響上方按鈕） */}
			<div className={`fab-options ${open ? 'show' : ''}`}>
				<button onClick={onRouteClick}>🧭 設定路線</button>
				<button onClick={onAboutClick}>ℹ️ 關於我們</button>
				<button onClick={onSDGsClick}>♻️ SDGs 宣導</button>
			</div>
		</>
	);
};

export default FloatingMenu;