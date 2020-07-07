import React, { useState, useEffect } from 'react';

import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './ModalWindow.css';

/*
	PROPS:

		MODAL:
			- modalShow			-> Opcional, true/false, se habilitado => exibe MODAL, se nao => nao exibe MODAL
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
const ModalWindow = props => {
	const [showModal, setShowModal] = useState((props.modalShow || false));

	useEffect(() => {
		if (props.modalShow) {
			setShowModal(true);
		}

		return () => {
			setShowModal(false);
		};
	}, [props.modalShow]);

	const Component = () => {
		const toggleModal = e => {
			e.preventDefault();
			setShowModal(!showModal);
		};

		const exitCallback = (e, _modalConfirm, _isButton, _callback) => {
			if (e) {
				e.preventDefault();
			}

			if (typeof _callback === 'function') {
				if ((!_modalConfirm && !_isButton) || (_modalConfirm && _isButton)) {
					_callback();
				}
			}

			if (_isButton) {
				setShowModal(!showModal);
			}
		};

		const modalConfirm = (props.modalConfirm || false);
		const modalCentered = (props.modalCentered || false);
		const modalTitle = (props.modalTitle || (props.modalConfirm ? 'Confirme' : 'Aviso'));
		const modalMessage = props.modalMessage;
		const modalSize = (props.modalSize || 'lg');
		const modalFooterSize = (props.modalFooterSize || 'md');
		const callback = props.callback;

		return (
			showModal ? (
				<Modal isOpen={ showModal } centered={ modalCentered } size={ modalSize } className="modal-window" onExit={ e => exitCallback(e, modalConfirm, false, callback) }>
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
								<React.Fragment>
									<Button type="button" color="success" size={ modalFooterSize } onClick={ e => exitCallback(e, modalConfirm, true, callback) }>Confirmar</Button>
									<Button type="button" color="danger" size={ modalFooterSize } onClick={ toggleModal }>Cancelar</Button>
								</React.Fragment>
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

	return <Component />;
};

export default ModalWindow;
