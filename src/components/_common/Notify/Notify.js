import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Toast, ToastHeader, ToastBody, Button } from 'reactstrap';

import './Notify.css';

/*
	PROPS:
		- info				-> OBRIGATORIO, texto ou objeto
		- header			-> (default: "Notificação")
		- type				-> exibe ícone (default: info)
		- form				-> Opcional: informa o id do elemento DOM de formulario
								- habilitar/desabilitar elementos do form durante exibicao da mensagem de erro
*/
const Notify = props => {
	const [showNotify, setShowNotify] = useState(false);

	useEffect(() => {
		let timer;

		if (props.info) {
			setShowNotify(true);

			timer = setTimeout(() => {
				setShowNotify(false);
			}, 15000);
		}

		return () => {
			setShowNotify(false);
			clearTimeout(timer);
		}
	}, [props.info]);

	useEffect(() => {
		toggleElements(showNotify, props.form);
	}, [showNotify, props.form]);

	const toggleElements = (block, form) => {
		if (form) {
			const formElements = document.getElementById(form) && document.getElementById(form).elements;

			if (formElements) {
				const formLength = formElements.length;

				for (let i = 0; i < formLength; ++i) {
					if (block) {
						formElements[i].disabled = true;
					} else {
						formElements[i].disabled = false;
					}
				}
			}
		}
	};

	const notifyHeader = (p, type) => {
		let header = (p !== 2 ? 'secondary' : 'Notificação');

		if (type) {
			switch (type) {
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
		setShowNotify(false);
	};

	const CheckNotify = () => {
		const handledInfo = props.info && props.info.data;

		let Component = null;

		if (showNotify) {
			Component = (
				<Toast className="notify">
					<Button close onClick={ closeNotify } />
					<ToastHeader icon={ notifyHeader(1, props.type) }>
						{ (props.header || notifyHeader(2, props.type)) }{ (handledInfo ? ` (código ${props.info.status})` : '') }
					</ToastHeader>
					<ToastBody>
						{ (handledInfo ? handledInfo.message : (props.info ? (props.info.message || props.info) : '')) }
					</ToastBody>
				</Toast>
			);
		}

		return ReactDOM.createPortal(Component, document.getElementById('notify_p'));
	};

	return (
		<CheckNotify />
	);
};

export default Notify;
