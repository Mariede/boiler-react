import React, { Fragment, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import InputMask from 'react-input-mask';

import useDataGet from 'components/_custom-hooks/useDataGet';

import formValidator from 'helpers/formValidator';
import functions from 'helpers/functions';

const ModalForm = props => {
	const { data, setDataChange } = props;

	const [formElements, handleFormElements] = useState(
		{
			nome: data.nome || '',
			email: data.email || '',
			tipo: (data.tipo && data.tipo.id) || '',
			ativo: (data.ativo ? true : (data.ativo === false ? false : '')),
			cep: (data.cep ? String(data.cep).padStart(8, '0') : ''), // Mascara no formulario
			cpf: (data.cpf ? String(data.cpf).padStart(11, '0') : ''), // Mascara no formulario
			perfis: (Array.isArray(data.perfis) ? data.perfis.map(perfil => perfil.id) : (data.perfis ? [data.perfis.id] : []))
		}
	);

	const configFormValidation = [
		{
			id: 'nome',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty'
				},
				{
					rule: 'isCompleteName'
				}
			]
		},
		{
			id: 'email',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty'
				},
				{
					rule: 'isEmail'
				}
			]
		},
		{
			id: 'tipo',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Tipo não selecionado'
				},
				{
					rule: 'isInteger'
				}
			]
		},
		{
			id: 'ativo',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Estado não selecionado'
				},
				{
					rule: 'isBoolean'
				}
			]
		},
		{
			id: 'cep',
			optional: true,
			rules: [
				{
					rule: 'isCep'
				}
			]
		},
		{
			id: 'cpf',
			optional: true,
			rules: [
				{
					rule: 'isCpf'
				}
			]
		}
	];

	const initiateFormValidation = () => {
		formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 2
	};

	const changeFormElements = e => {
		e.preventDefault();

		formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 2

		const element = e.currentTarget;
		const { id, name } = element;
		const value = functions.parseFormElementsValues(element.value, element.options, element.multiple);

		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 2 de 2

		if (formCheck) {
			setDataChange(
				prevState => (
					{
						...prevState,
						submit: true,
						data: formElements
					}
				)
			);
		}
	};

	useEffect(
		initiateFormValidation,
		[]
	);

	const { Component, dataReady, dataContent } = useDataGet(
		{
			route: '/usuario/options',
			goReady: data.options,
			cbCatch: {
				header: 'Usuario',
				type: 4
			}
		}
	);

	if (dataReady && dataContent) {
		data.options = dataContent;
	}

	return (
		<Fragment>
			{ Component }
			<Form id="usuario-form" className="form" onSubmit={ submitForm } autoComplete="off">
				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="nome">Nome</Label>
							<Input type="text" value={ formElements.nome } id="nome" maxLength="200" onChange={ changeFormElements } />
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="email">E-mail</Label>
							<Input type="text" value={ formElements.email } id="email" maxLength="200" onChange={ changeFormElements } />
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 6 }>
						<FormGroup>
							<Label for="tipo">Tipo</Label>
							<Input type="select" value={ formElements.tipo } id="tipo" onChange={ changeFormElements }>
								<option value="">&rsaquo; preencher &lsaquo;</option>
								{
									data.options && Array.isArray(data.options.tipos) ? (
										data.options.tipos.map(
											(element, index) => <option value={ element.id } key={ index }>{ element.nome }</option>
										)
									) : (
										null
									)
								}
							</Input>
						</FormGroup>
					</Col>
					<Col md={ 6 }>
						<FormGroup>
							<Label for="ativo">Estado</Label>
							<Input type="select" value={ formElements.ativo } id="ativo" onChange={ changeFormElements }>
								<option value="">&rsaquo; preencher &lsaquo;</option>
								{
									data.options && Array.isArray(data.options.ativo) ? (
										data.options.ativo.map(
											(element, index) => <option value={ element.id } key={ index }>{ element.nome }</option>
										)
									) : (
										null
									)
								}
							</Input>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 6 }>
						<FormGroup>
							<Label for="cep">CEP</Label>
							<Input type="text" value={ formElements.cep } id="cep" onChange={ changeFormElements } mask="99999-999" maskChar=" " tag={ InputMask } />
						</FormGroup>
					</Col>
					<Col md={ 6 }>
						<FormGroup>
							<Label for="cpf">CPF</Label>
							<Input type="text" value={ formElements.cpf } id="cpf" onChange={ changeFormElements } mask="999.999.999-99" maskChar=" " tag={ InputMask } />
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="perfis">Perfis selecionados</Label>
							<Input type="select" value={ formElements.perfis } id="perfis" size="3" multiple onChange={ changeFormElements }>
								{
									data.options && Array.isArray(data.options.perfis) ? (
										data.options.perfis.map(
											(element, index) => <option value={ element.id } key={ index }>{ element.nome }</option>
										)
									) : (
										null
									)
								}
							</Input>
						</FormGroup>
					</Col>
				</Row>
			</Form>
		</Fragment>
	);
};

export default ModalForm;