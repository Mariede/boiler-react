import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Toast, ToastHeader, ToastBody, Button } from 'reactstrap';

import './Notify.css';

const Notify = props => {
	const [showNotify, setShowNotify] = useState(false);
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if (props.info && Object.keys(props.info).length) {
			setShowNotify(true);

			const timer = setTimeout(() => {
				setShowNotify(false);
			}, 15000);

			return () => {
				clearTimeout(timer);
				setShowNotify(false);
			}
		}
	}, [props.info]);

	const notifyHeader = p => {
		let header = (p !== 2 ? 'secondary' : 'Notificação');

		if (props.type) {
			switch (props.type) {
				case 1: {
				// Success
					header = (p !== 2 ? 'success' : 'Sucesso');
					break;
				}
				case 2: {
				// Info
					header = (p !== 2 ? 'info' : 'Informação');
					break;
				}
				case 3: {
				// Warning
					header = (p !== 2 ? 'warning' : 'Aviso');
					break;
				}
				case 4: {
				// Error
					header = (p !== 2 ? 'danger' : 'Erro');
					break;
				}
				default:
			}
		}

		return header;
	};

	const closeNotify = e => {
		e.preventDefault();
		setIsOpen(false);
	};

	const checkNotify = () => {
		let Component = null;

		if (showNotify) {
			Component = (
				<Toast className="notify" isOpen={ isOpen }>
					<Button close onClick={ closeNotify } />
					<ToastHeader icon={ notifyHeader(1) }>
						{ (props.header || notifyHeader(2)) }{ (props.info.code ? ` (código ${props.info.code})` : '') }
					</ToastHeader>
					<ToastBody>
						{ (props.info.message || 'Erro na aplicação') }
					</ToastBody>
				</Toast>
			);
		}

		return ReactDOM.createPortal(Component, document.getElementById('notify_p'));
	};

	return checkNotify();
};

export default Notify;
