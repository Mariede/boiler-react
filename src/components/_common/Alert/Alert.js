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
*/
const Alert = props => {
	const [modalShow, setModalShow] = useState(false);

	const exitCallback = () => {
		if (typeof props.callback === 'function') {
			return props.callback();
		}
	};

	const toggleThis = e => {
		e.preventDefault();
		setModalShow(!modalShow);
	};

	const AlertComponent = props => {
		let Component = null;

		if (modalShow) {
			Component = (
				<Modal isOpen={ modalShow } size={ props.size } centered={ props.centered } className="my-alert" onExit={ exitCallback }>
					<ModalHeader className="modal-header-local" toggle={ e => toggleThis(e) }>
						<i className="fas fa-bell"></i> { props.title }
					</ModalHeader>
					<ModalBody className="modal-body-local">
						{ props.message }
					</ModalBody>
					<ModalFooter className="modal-footer-local">
						<Button type="button" color="success" onClick={ e => toggleThis(e) }>Fechar</Button>
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
			<AlertComponent title={ (props.title || "Aviso") } message={ props.message } centered={ (props.centered || false) } size={ (props.size || "lg") } />
		</div>
	);
};

export default Alert;
