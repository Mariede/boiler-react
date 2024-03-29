import { Fragment, useState } from 'react';

import { Button } from 'reactstrap';

import ModalWindow from 'components/_common/ModalWindow';

/*
	DEPENDENCIAS:
		- ModalWindow
		- Reactstrap

	PROPS:

		Button:

			- buttonId					-> Botao de chamada: ID DOM do botao (OPCIONAL)
			- buttonType				-> Botao de chamada (default: "button")
			- buttonColor				-> Botao de chamada (default: "success")
			- buttonSize				-> Botao de chamada (default: "")
			- buttonOutline				-> Botao de chamada: true/false (default: { false })
			- buttonBlock				-> Botao de chamada: true/false (default: { false })
			- buttonDisabled			-> Botao de chamada: true/false (default: { false })
			- buttonClassName			-> Botao de chamada (default: undefined)
			- buttonText				-> Botao de chamada (default: "Confirmar")

			- buttonExecuteBeforeShow	-> Executa uma funcao no clique do botao, liberando ou nao a exibicao do modal
											- caso nao exista, padrao e exibir modal

		ModalWindow:
			- modalConfirm				-> Opcional, true/false, se habilitado => modo CONFIRMA, se nao => modo INFORMATIVO
			- modalCentered				-> Opcional, true/false, se habilitado => modo CENTRALIZADO, se nao => modo PADRAO
			- modalTitle				-> Modal (default: "Aviso" para modo INFORMACAO ou "Confirme" para modo CONFIRMA)
											- se modalTitle igual "!no" nao exibe o header do modal
			- modalMessage				-> Modal: Aviso a ser emitido, recomendado
			- modalSize					-> Modal (default: "sm")
			- modalFooterSize			-> Modal: tamanho do botao no footer do modal (default: "sm")

			- modalCallback				-> Executa uma funcao de callback na saida do modal
											- caso exista, se modo INFORMATIVO sempre executa
											- caso exista, se modo CONFIRMA executa somente no botao Confirmar
											- Executa o preventDefault no Modal
*/
const Alert = props => {
	const { buttonId, buttonType, buttonSize, buttonColor, buttonOutline, buttonBlock, buttonDisabled, buttonClassName, buttonText, buttonExecuteBeforeShow } = props;
	const { modalConfirm, modalCentered, modalTitle, modalMessage, modalSize, modalFooterSize, modalCallback } = props;

	const [showAlert, setShowAlert] = useState({ show: false, renderKey: false, originElement: null });

	const buttonProperties = {
		type: (buttonType || 'button'),
		size: (buttonSize || ''),
		color: (buttonColor || 'success'),
		outline: (buttonOutline || false),
		block: (buttonBlock || false),
		disabled: (buttonDisabled === true),
		className: (buttonClassName || undefined)
	};

	const modalProperties = {
		modalShow: showAlert.show,
		modalConfirm: modalConfirm,
		modalCentered: modalCentered,
		modalTitle: modalTitle,
		modalMessage: modalMessage,
		modalSize: (modalSize || 'sm'),
		modalFooterSize: (modalFooterSize || 'sm'),
		modalCallback: modalCallback,
		modalOriginElement: showAlert.originElement
	};

	// Apenas se existir ID para o botao
	if (buttonId) {
		buttonProperties.id = buttonId;
	}

	const toggleAlert = e => {
		e.preventDefault();

		let goAlert = true;

		if (typeof buttonExecuteBeforeShow === 'function') {
			goAlert = buttonExecuteBeforeShow();
		}

		setShowAlert({ show: goAlert, renderKey: !showAlert.renderKey, originElement: e.currentTarget });
	};

	return (
		<Fragment key={ showAlert.renderKey }>
			<Button { ...buttonProperties } onClick={ toggleAlert }>{ (buttonText || 'Confirmar') }</Button>
			<ModalWindow { ...modalProperties } />
		</Fragment>
	);
};

export default Alert;
