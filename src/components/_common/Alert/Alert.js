import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './Alert.css';

/*
	PROPS:
		- title				-> Modal (default: "Aviso")
		- message			-> Modal: Aviso a ser emitido, recomendado
		- centered			-> Modal: true/false (default: { false })
		- size				-> Modal (default: "lg")
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

	const exitCallback = (isConfirm, isButton) => {
		if (typeof props.callback === 'function') {
			if ((!isConfirm && !isButton) || (isConfirm && isButton)) {
				props.callback();
			}
		}

		if (isButton) {
			setModalShow(!modalShow);
		}
	};

	const toggleThis = e => {
		e.preventDefault();
		setModalShow(!modalShow);
	};

	const AlertComponent = props => {
		const isConfirm = props.confirm || false;

		let Component = null;

		if (modalShow) {
			Component = (
				<Modal isOpen={ modalShow } centered={ props.centered } size={ props.size } className="my-alert" onExit={ e => exitCallback(isConfirm, false) }>
					<ModalHeader className="modal-header-local" toggle={ e => toggleThis(e) }>
						{
							isConfirm ? (
						<i className="fas fa-check-double"></i>
							) : (
						<i className="fas fa-bell"></i>
							)
						} { props.title }
					</ModalHeader>
					<ModalBody className="modal-body-local">
						{ props.message }
					</ModalBody>
					<ModalFooter className="modal-footer-local">
						{
							isConfirm ? (
						<React.Fragment>
							<Button type="button" color="danger" onClick={ e => toggleThis(e) }>Cancelar</Button>
							<Button type="button" color="success" onClick={ e => exitCallback(isConfirm, true) }>Confirmar</Button>
						</React.Fragment>
							) : (
						<Button type="button" color="success" onClick={ e => toggleThis(e) }>Fechar</Button>
							)
						}
					</ModalFooter>
				</Modal>
			);
		}

		return (
			Component
		);
	};

	return (
		<div className="alert-group">
			<Button type={ (props.buttonType || "button") } color={ (props.buttonColor || "success") } size={ (props.buttonSize || "md") } outline={ (props.buttonOutline || false) } block={ (props.buttonBlock || false) } onClick={ e => toggleThis(e) }>{ (props.buttonText || "Confirmar") }</Button>
			<AlertComponent title={ (props.title || (props.confirm ? "Confirme" : "Aviso")) } message={ props.message } centered={ (props.centered || false) } size={ (props.size || "lg") } confirm={ props.confirm } />
		</div>
	);
};

export default Alert;
