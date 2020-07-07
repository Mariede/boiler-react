import React, { useState } from 'react';

import { Button } from 'reactstrap';

import ModalWindow from 'components/_common/ModalWindow';

import './Alert.css';

/*
	** Component Alert requer o componente de Modal (ModalWindow) instalado **

	PROPS:

		Button:

			- buttonType		-> Botao de chamada (default: "button")
			- buttonColor		-> Botao de chamada (default: "success")
			- buttonSize		-> Botao de chamada (default: "md")
			- buttonOutline		-> Botao de chamada: true/false (default: { false })
			- buttonBlock		-> Botao de chamada: true/false (default: { false })
			- buttonText		-> Botao de chamada (default: "Confirmar")

		ModalWindow:
			- modalConfirm		-> Opcional, true/false, se habilitado => modo CONFIRMA, se nao => modo INFORMATIVO
			- modalCentered		-> Opcional, true/false, se habilitado => modo CENTRALIZADO, se nao => modo PADRAO
			- modalTitle		-> Modal (default: "Aviso" para modo INFORMACAO ou "Confirme" para modo CONFIRMA)
										- se modalTitle igual "!no" nao exibe o header do modal
			- modalMessage		-> Modal: Aviso a ser emitido, recomendado
			- modalSize			-> Modal (default: "lg")
			- modalFooterSize	-> Modal: tamanho do botao no footer do modal (default: "md")

			- callback			-> Executa uma funcao de callback na saida do modal
										- caso exista, se modo INFORMATIVO sempre executa
										- caso exista, se modo CONFIRMA executa somente no botao Confirmar
*/
const Alert = props => {
	const [showAlert, setShowAlert] = useState({ show: false, render: 0 });

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
		callback: props.callback
	};

	const toggleAlert = e => {
		e.preventDefault();
		setShowAlert({ show: true, render: ++showAlert.render });
	};

	return (
		<div className="alert-group" key={ showAlert.render }>
			<Button { ...buttonProperties } onClick={ toggleAlert }>{ (props.buttonText || 'Confirmar') }</Button>
			<ModalWindow { ...modalProperties } />
		</div>
	);
};

export default Alert;
