import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'reactstrap';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

import './Notify.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- info				-> OBRIGATORIO, texto ou objeto
		- header			-> (default: "Notificação")
		- type				-> exibe ícone (default: info)
		- form				-> Opcional: informa o id do elemento DOM de formulario
								- habilitar/desabilitar elementos do form durante exibicao da mensagem de erro
*/
const Notify = props => {
	const { info: notifyInfo, header: notifyHeader, type: notifyType, form: notifyForm } = props;

	const [showNotify, setShowNotify] = useState(false);

	const handledNotifyInfo = notifyInfo && notifyInfo.data;

	useEffect(
		() => {
			if (notifyInfo) {
				setShowNotify(true);
			}

			const timer = setTimeout(
				() => {
					if (notifyInfo) {
						setShowNotify(false);
					}
				}, 15000
			);

			return () => {
				setShowNotify(false);
				clearTimeout(timer);
			};
		},
		[notifyInfo]
	);

	useEffect(
		() => {
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

			toggleFormElements(showNotify, notifyForm);
		},
		[showNotify, notifyForm]
	);

	useLayoutEffect(
		() => {
			if (showNotify) {
				const arrayHeight = [];

				let totalHeight = 0,
					lastElement = null;

				Array.from(document.getElementsByClassName('notify')).forEach(
					(element, i) => {
						arrayHeight.push(element.offsetHeight);
						totalHeight = totalHeight + (i === 0 ? element.offsetTop : arrayHeight[i - 1]);
						lastElement = element;
					}
				);

				if (lastElement) {
					lastElement.style.top = `${totalHeight}px`;
				}
			}
		},
		[showNotify]
	);

	const Component = () => {
		const _notifyHeader = (p, type) => {
			const tableNotify = [
				['secondary', 'Notificação'],
				['success', 'Sucesso'],
				['info', 'Informação'],
				['warning', 'Aviso'],
				['danger', 'Erro']
			];

			return tableNotify[(type || 0)][p];
		};

		const closeNotify = e => {
			e.preventDefault();
			setShowNotify(false);
		};

		return (
			showNotify ? (
				<Toast className="notify">
					<Button close onClick={ closeNotify } />

					<ToastHeader icon={ _notifyHeader(0, notifyType) }>
						{ (notifyHeader || _notifyHeader(1, notifyType)) }{ (handledNotifyInfo ? ` (código ${handledNotifyInfo.code})` : '') }
					</ToastHeader>

					<ToastBody>
						{ (handledNotifyInfo ? handledNotifyInfo.message : (notifyInfo ? (notifyInfo.message || notifyInfo) : '')) }
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
