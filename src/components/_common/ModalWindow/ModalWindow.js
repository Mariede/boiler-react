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
			- modalSize				-> Modal (default: "lg")
			- modalFooterSize		-> Modal: tamanho do botao no footer do modal (default: "md")

			- modalCallback			-> Executa uma funcao de callback na saida do modal
										- caso exista, se modo INFORMATIVO sempre executa
										- caso exista, se modo CONFIRMA executa somente no botao Confirmar
										- Executa o preventDefault no Modal
										- Se callback retornar falsy exceto undefined no botao Confirmar, nao fecha o modal

			- modalOriginElement	-> Especifica o elemento DOM de origem que acionou o modal
*/
const ModalWindow = props => {
	const modalConfirm = (props.modalConfirm || false);
	const modalCentered = (props.modalCentered || false);
	const modalTitle = (props.modalTitle || (props.modalConfirm ? 'Confirme' : 'Aviso'));
	const modalMessage = props.modalMessage;
	const modalSize = (props.modalSize || 'sm');
	const modalFooterSize = (props.modalFooterSize || 'sm');
	const modalCallback = props.modalCallback;
	const modalOriginElement = props.modalOriginElement;

	const [showModal, setShowModal] = useState((props.modalShow || false));

	const toggleModal = e => {
		e.preventDefault();
		setShowModal(!showModal);
	};

	const exitCallback = (_modalConfirm, _isButton, _callback, e) => {
		if (e) {
			e.preventDefault();
		}

		let buttonAndCloseThis;

		if (typeof _callback === 'function') {
			if ((!_modalConfirm && !_isButton) || (_modalConfirm && _isButton)) {
				buttonAndCloseThis = _callback(e, modalOriginElement);
			}
		}

		// Apenas se botao pressionado, verifica o possivel retorno booleano do callback
		if (_isButton && (buttonAndCloseThis === undefined || buttonAndCloseThis)) {
			setShowModal(!showModal);
		}
	};

	return (
		showModal ? (
			<Modal isOpen={ showModal } centered={ modalCentered } size={ modalSize } className="modal-window" onExit={ e => exitCallback(modalConfirm, false, modalCallback, e) }>
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
								<Button type="button" color="success" size={ modalFooterSize } onClick={ e => exitCallback(modalConfirm, true, modalCallback, e) }>Confirmar</Button>
								<Button type="button" color="danger" size={ modalFooterSize } onClick={ toggleModal }>Cancelar</Button>
							</Fragment>
						) : (
							<Button type="button" color="success" size={ modalFooterSize } onClick={ toggleModal }>Fechar</Button>
						)
					}
				</ModalFooter>
			</Modal>
		) : (
			null
		)
	);
};

export default ModalWindow;
