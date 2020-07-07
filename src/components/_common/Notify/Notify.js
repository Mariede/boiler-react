import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'reactstrap';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

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
		if (props.info) {
			setShowNotify(true);
		}

		const timer = setTimeout(
			() => {
				if (props.info) {
					setShowNotify(false);
				}
			}, 15000
		);

		return () => {
			setShowNotify(false);
			clearTimeout(timer);
		};
	}, [props.info]);

	useEffect(() => {
		const toggleFormElements = (block, form) => {
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

		toggleFormElements(showNotify, props.form);
	}, [showNotify, props.form]);

	const Component = () => {
		const notifyHeader = (p, type) => {
			const tableNotify = [
				['secondary', 'Notificação'],
				['success', 'Sucesso'],
				['info', 'Informação'],
				['warning', 'Aviso'],
				['danger', 'Erro']
			];

			return (
				type ? tableNotify[type][p] : null
			);
		};

		const closeNotify = e => {
			e.preventDefault();
			setShowNotify(false);
		};

		const handledInfo = props.info && props.info.data;

		return (
			showNotify ? (
				<Toast className="notify">
					<Button close onClick={ closeNotify } />
					<ToastHeader icon={ notifyHeader(0, props.type) }>
						{ (props.header || notifyHeader(1, props.type)) }{ (handledInfo ? ` (código ${handledInfo.code})` : '') }
					</ToastHeader>
					<ToastBody>
						{ (handledInfo ? handledInfo.message : (props.info ? (props.info.message || props.info) : '')) }
					</ToastBody>
				</Toast>
			) : (
				null
			)
		);
	};

	return (
		ReactDOM.createPortal(
			<Component />,
			document.getElementById('root')
		)
	);
};

export default Notify;
