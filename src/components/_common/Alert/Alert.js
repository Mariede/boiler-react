import React, { useState } from 'react';

import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './Alert.css';

/*
	PROPS:
		- title				-> Modal (default: "Aviso" para modo INFORMACAO ou "Confirme" para modo CONFIRMA)
									- se title igual "!no" nao exibe o header do modal
		- message			-> Modal: Aviso a ser emitido, recomendado
		- centered			-> Modal: true/false (default: { false })
		- size				-> Modal (default: "lg")
		- footerSize		-> Modal: tamanho do botao no footer do modal (default: "md")
		- buttonType		-> Botao de chamada (default: "button")
		- buttonColor		-> Botao de chamada (default: "success")
		- buttonSize		-> Botao de chamada (default: "md")
		- buttonOutline		-> Botao de chamada: true/false (default: { false })
		- buttonBlock		-> Botao de chamada: true/false (default: { false })
		- buttonText		-> Botao de chamada (default: "Confirmar")

		- callback			-> Executa uma funcao de callback na saida do modal
									- caso exista, se modo INFORMATIVO sempre executa
									- caso exista, se modo CONFIRMA executa somente no botao Confirmar
		- confirm			-> Opcional, true/false, se habilitado => modo CONFIRMA, se nao => modo INFORMATIVO
*/
const Alert = props => {
	const [modalShow, setModalShow] = useState(false);

	const toggleModal = e => {
		e.preventDefault();
		setModalShow(!modalShow);
	};

	const AlertComponent = props => {
		const exitCallback = (e, isConfirm, isButton, callback) => {
			if (e) {
				e.preventDefault();
			}

			if (typeof callback === 'function') {
				if ((!isConfirm && !isButton) || (isConfirm && isButton)) {
					callback();
				}
			}

			if (isButton) {
				setModalShow(!modalShow);
			}
		};

		const isConfirm = props.confirm || false;

		let Component = null;

		if (modalShow) {
			Component = (
				<Modal isOpen={ modalShow } centered={ props.centered } size={ props.size } className="my-alert" onExit={ e => exitCallback(e, isConfirm, false, props.callback) }>
					{
						props.title !== '!no' ? (
							<ModalHeader className="modal-header-local" toggle={ toggleModal }>
								{
									isConfirm ? (
										<i className="fas fa-check-double"></i>
									) : (
										<i className="fas fa-bell"></i>
									)
								} { props.title }
							</ModalHeader>
						) : (
							null
						)
					}

					<ModalBody className="modal-body-local">
						{ props.message }
					</ModalBody>

					<ModalFooter className="modal-footer-local">
						{
							isConfirm ? (
								<React.Fragment>
									<Button type="button" color="success" size={ props.footerSize } onClick={ e => exitCallback(e, isConfirm, true, props.callback) }>Confirmar</Button>
									<Button type="button" color="danger" size={ props.footerSize } onClick={ toggleModal }>Cancelar</Button>
								</React.Fragment>
							) : (
								<Button type="button" color="success" size={ props.footerSize } onClick={ toggleModal }>Fechar</Button>
							)
						}
					</ModalFooter>
				</Modal>
			);
		}

		return Component;
	};

	return (
		<div className="alert-group">
			<Button type={ (props.buttonType || 'button') } color={ (props.buttonColor || 'success') } size={ (props.buttonSize || 'md') } outline={ (props.buttonOutline || false) } block={ (props.buttonBlock || false) } onClick={ toggleModal }>{ (props.buttonText || 'Confirmar') }</Button>
			<AlertComponent title={ (props.title || (props.confirm ? 'Confirme' : 'Aviso')) } message={ props.message } centered={ (props.centered || false) } size={ (props.size || 'lg') } footerSize={ (props.footerSize || 'md') } confirm={ props.confirm } callback={ props.callback } />
		</div>
	);
};

export default Alert;
