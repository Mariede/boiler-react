import React, { Fragment, useState } from 'react';

import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './ModalWindow.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:

		MODAL:
			- modalShow				-> Opcional, true/false, se habilitado => exibe MODAL, se nao => nao exibe MODAL
			- modalConfirm			-> Opcional, true/false, se habilitado => modo CONFIRMA, se nao => modo INFORMATIVO
			- modalCentered			-> Opcional, true/false, se habilitado => modo CENTRALIZADO, se nao => modo PADRAO

			- modalTitle			-> Modal (default: "Aviso" para modo INFORMACAO ou "Confirme" para modo CONFIRMA)
										- se modalTitle igual "!no" nao exibe o header do modal
			- modalMessage			-> Modal: Aviso a ser emitido, recomendado
			- modalSize				-> Modal (default: "sm")
			- modalFooterSize		-> Modal: tamanho do botao no footer do modal (default: "sm")

			- modalCallback			-> Executa uma funcao de callback na saida do modal
										- caso exista, se modo INFORMATIVO sempre executa
										- caso exista, se modo CONFIRMA executa somente no botao Confirmar, caso este seja diferente de submit
										- Se callback retornar falsy exceto undefined no botao Confirmar, nao fecha o modal

			- modalCallbackPlanB	-> Executa uma funcao de callback na saida do modal
										- Caso exista, executa somente se modo CONFIRMA sem botao Confirmar
										- Se callback retornar falsy exceto undefined no botao Confirmar, nao fecha o modal

			- modalOriginElement	-> Especifica o elemento DOM de origem que acionou o modal

			- modalFormSubmitID 		-> Especifica que o modal contem um formulario associado
										- Troca o botao de confirmacao do tipo button para o tipo submit e associa o ID de formulario ao botao
										- So funciona no modo CONFIRMA, e neste caso, inutiliza eventual prop modalCallback recebida
											- Tratar callback no evento onSubmit do formulario
*/
const ModalWindow = props => {
	const modalConfirm = (props.modalConfirm || false);
	const modalCentered = (props.modalCentered || false);
	const modalTitle = (props.modalTitle || (props.modalConfirm ? 'Confirme' : 'Aviso'));
	const modalMessage = props.modalMessage;
	const modalSize = (props.modalSize || 'sm');
	const modalFooterSize = (props.modalFooterSize || 'sm');
	const modalCallback = props.modalCallback;
	const modalCallbackPlanB = props.modalCallbackPlanB;
	const modalOriginElement = props.modalOriginElement;
	const modalFormSubmitID = props.modalFormSubmitID;

	const [showModal, setShowModal] = useState((props.modalShow || false));

	const toggleModal = e => {
		e.preventDefault();
		setShowModal(!showModal);
	};

	const exitCallback = (_modalConfirm, _isButton, _callback, _callbackPlanB, e) => {
		if (e) {
			e.preventDefault();
		}

		let buttonAndCloseThis;

		if (_modalConfirm) {
			if (_isButton) {
				if (typeof _callback === 'function') {
					buttonAndCloseThis = _callback(e, modalOriginElement);
				}
			} else {
				if (typeof _callbackPlanB === 'function') {
					buttonAndCloseThis = _callbackPlanB(e, modalOriginElement);
				}
			}
		} else {
			if (typeof _callback === 'function') {
				buttonAndCloseThis = _callback(e, modalOriginElement);
			}
		}

		// Apenas se botao pressionado, verifica o possivel retorno booleano do callback
		if (_isButton && (buttonAndCloseThis === undefined || buttonAndCloseThis)) {
			setShowModal(!showModal);
		}
	};

	return (
		<Modal isOpen={ showModal } centered={ modalCentered } size={ modalSize } className="modal-window" onClosed={ e => exitCallback(modalConfirm, false, modalCallback, modalCallbackPlanB, e) }>
			{
				modalTitle !== '!no' ? (
					<ModalHeader className="modal-header-local" toggle={ toggleModal }>
						{
							modalConfirm ? (
								<i className="fas fa-check-double"></i>
							) : (
								<i className="fas fa-bell"></i>
							)
						} { modalTitle }
					</ModalHeader>
				) : (
					null
				)
			}

			<ModalBody className="modal-body-local">
				{ modalMessage }
			</ModalBody>

			<ModalFooter className="modal-footer-local">
				{
					modalConfirm ? (
						<Fragment>
							{
								modalFormSubmitID ? (
									<Button type="submit" form={ modalFormSubmitID } color="success" size={ modalFooterSize }>Confirmar</Button>
								) : (
									<Button type="button" color="success" size={ modalFooterSize } onClick={ e => exitCallback(modalConfirm, true, modalCallback, modalCallbackPlanB, e) }>Confirmar</Button>
								)
							}
							<Button type="button" color="danger" size={ modalFooterSize } onClick={ toggleModal }>Cancelar</Button>
						</Fragment>
					) : (
						<Button type="button" color="success" size={ modalFooterSize } onClick={ toggleModal }>Fechar</Button>
					)
				}
			</ModalFooter>
		</Modal>
	);
};

export default ModalWindow;
