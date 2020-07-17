import React, { useState } from 'react';

import { Button } from 'reactstrap';

import ModalWindow from 'components/_common/ModalWindow';

import './Alert.css';

/*
	** Component Alert requer o componente de Modal (ModalWindow) instalado **

	PROPS:

		Button:

			- buttonType				-> Botao de chamada (default: "button")
			- buttonColor				-> Botao de chamada (default: "success")
			- buttonSize				-> Botao de chamada (default: "md")
			- buttonOutline				-> Botao de chamada: true/false (default: { false })
			- buttonBlock				-> Botao de chamada: true/false (default: { false })
			- buttonText				-> Botao de chamada (default: "Confirmar")

			- buttonExecuteBeforeShow	-> Executa uma funcao no clique do botao, liberando ou nao a exibicao do modal
											- caso nao exista, padrao e exibir modal

		ModalWindow:
			- modalConfirm				-> Opcional, true/false, se habilitado => modo CONFIRMA, se nao => modo INFORMATIVO
			- modalCentered				-> Opcional, true/false, se habilitado => modo CENTRALIZADO, se nao => modo PADRAO
			- modalTitle				-> Modal (default: "Aviso" para modo INFORMACAO ou "Confirme" para modo CONFIRMA)
											- se modalTitle igual "!no" nao exibe o header do modal
			- modalMessage				-> Modal: Aviso a ser emitido, recomendado
			- modalSize					-> Modal (default: "lg")
			- modalFooterSize			-> Modal: tamanho do botao no footer do modal (default: "md")

			- modalCallback				-> Executa uma funcao de callback na saida do modal
											- caso exista, se modo INFORMATIVO sempre executa
											- caso exista, se modo CONFIRMA executa somente no botao Confirmar
											- Executa o preventDefault no Modal
*/
const Alert = props => {
	const [showAlert, setShowAlert] = useState({ show: false, render: 0 });

	const buttonExecuteBeforeShow = props.buttonExecuteBeforeShow;

	const buttonProperties = {
		type: (props.buttonType || 'button'),
		color: (props.buttonColor || 'success'),
		size: (props.buttonSize || 'md'),
		outline: (props.buttonOutline || false),
		block: (props.buttonBlock || false)
	};

	const modalProperties = {
		modalShow: showAlert.show,
		modalConfirm: props.modalConfirm,
		modalCentered: props.modalCentered,
		modalTitle: props.modalTitle,
		modalMessage: props.modalMessage,
		modalSize: props.modalSize,
		modalFooterSize: props.modalFooterSize,
		modalCallback: props.modalCallback
	};

	const toggleAlert = e => {
		e.preventDefault();

		let goAlert = true;

		if (typeof buttonExecuteBeforeShow === 'function') {
			goAlert = buttonExecuteBeforeShow();
		}

		setShowAlert({ show: goAlert, render: ++showAlert.render });
	};

	return (
		<span className="alert-group" key={ showAlert.render }>
			<Button { ...buttonProperties } onClick={ toggleAlert }>{ (props.buttonText || 'Confirmar') }</Button>
			<ModalWindow { ...modalProperties } />
		</span>
	);
};

export default Alert;
