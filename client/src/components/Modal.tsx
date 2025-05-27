import React, { ReactNode } from 'react';
import './modal.css';

interface ModalProps {
	show: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
	if (!show) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h2>{title}</h2>
					<button onClick={onClose} className="modal-close">&times;</button>
				</div>
				<div className="modal-body">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
