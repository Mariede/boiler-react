import React, { useRef, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import ModalWindow from 'components/_common/ModalWindow';

const ModalData = props => {
	const { param, data, setDataChange } = props;

	const [formElements, handleFormElements] = useState(
		{
			nome: data.nome,
			email: data.email
		}
	);

	const renderCount = useRef(0);

	const changeFormElements = e => {
		e.preventDefault();

		const { id, name, value } = e.currentTarget;
		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const modalCallback = e => {
		e.preventDefault();

		setDataChange(
			prevState => (
				{
					...prevState,
					submit: true,
					data: formElements
				}
			)
		);
	};

	const modalCallbackPlanB = () => {
		setDataChange(undefined);
	};

	useEffect(
		() => {
			renderCount.current++;
		}
	);

	const UsuarioForm = (
		<Form id="usuario-form" className="form">
			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="nome">Nome</Label>
						<Input type="text" value={ formElements.nome } id="nome" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="email">E-mail</Label>
						<Input type="text" value={ formElements.email } id="email" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>
		</Form>
	);

	return (
		<ModalWindow modalTitle={ `Usuario${param ? ` ${param}` : ''}` } modalMessage={ UsuarioForm } modalSize="md" modalFooterSize="md" modalCallback={ modalCallback } modalCallbackPlanB={ modalCallbackPlanB } modalShow={ true } modalConfirm modalCentered key={ renderCount.current } />
	);
};

export default ModalData;
