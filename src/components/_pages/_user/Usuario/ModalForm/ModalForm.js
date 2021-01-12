import { Fragment, useRef, useState, useEffect, useMemo, useContext } from 'react';

import { Alert } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import InputMask from 'react-input-mask';

import Multiple from 'components/_common/_form/Multiple';
import DataGet from 'components/_common/DataGet';

import formValidator from 'helpers/formValidator';
import functions from 'helpers/functions';

import ContextConfig from 'components/_context/ContextConfig';

import './ModalForm.css';

const ModalForm = props => {
	const { param, data, setDataChange } = props;

	const formConfig = useContext(ContextConfig).formConfig;

	const [dataGet, setDataGet] = useState(
		{
			ready: false,
			content: null
		}
	);

	const [formElements, handleFormElements] = useState(
		{
			nome: data.nome || '',
			email: data.email || '',
			cpf: (data.cpf ? String(data.cpf).padStart(11, '0') : ''), // Mascara no formulario
			empresa: (data.empresa && data.empresa.id) || '',
			ativo: (data.ativo ? true : (data.ativo === false ? false : '')),
			detalhes: data.detalhes || '',
			perfis: functions.getArrayOnly(data.perfis, 'id')
		}
	);

	const componentFirstRender = useRef(true);

	const configFormValidation = [
		{
			id: 'nome',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Nome não preenchido'
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
					rule: 'isNotEmpty',
					message: 'E-mail não preenchido'
				},
				{
					rule: 'isEmail'
				}
			]
		},
		{
			id: 'cpf',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'CPF não preenchido'
				},
				{
					rule: 'isCpf'
				}
			]
		},
		{
			id: 'empresa',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Empresa não selecionada'
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
			id: 'detalhes',
			optional: true,
			rules: [
				{
					rule: 'lenRange',
					message: `Detalhes deve conter entre ${formConfig.detailsMinLen} e ${formConfig.detailsMaxLen} caracteres`,
					extraParams: [formConfig.detailsMinLen, formConfig.detailsMaxLen]
				}
			]
		},
		{
			id: 'perfis',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Nenhum perfil selecionado'
				}
			]
		}
	];

	const changeFormElements = e => {
		e.preventDefault();

		const element = e.currentTarget;
		const { id, name } = element;
		const value = functions.parseFormElementsValues(element.value, element.options, element.multiple);

		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const addFiles = e => {
		e.preventDefault();

		const element = e.currentTarget;
		const content = element.files;

		if (content && content.length !== 0) {
			handleFormElements(prevState => ({ ...prevState, fileContent: content }));
		} else {
			const { fileContent, ...newState } = formElements;
			handleFormElements(newState);
		}
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 3 de 3 (ativa)

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

	// Validacao de formulario
	useEffect(
		() => {
			if (componentFirstRender.current) {
				// So deve rodar no primeiro render
				formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 3
				componentFirstRender.current = false;
			} else {
				// Roda em todos os render subsequentes
				formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 3
			}
		}
	);

	const checkCompanyDateLimit = useMemo(
		() => {
			const dateCheck = (
				data.empresa ? (
					functions.formatStringToDate(data.empresa.dataLimiteUso)
				) : (
					null
				)
			);

			const dateNow = (
				dataGet.content && dataGet.content.agora ? (
					functions.formatStringToDate(dataGet.content.agora.valor)
				) : (
					null
				)
			);

			if (dateCheck instanceof Date && dateNow instanceof Date) {
				if (dateCheck - dateNow <= 0) {
					return false;
				}
			}

			return true;
		},
		[data.empresa, dataGet.content]
	);

	return (
		<Fragment>
			<DataGet
				setDataGet={ setDataGet }
				baseRoute="/usuario/options"
				cbCatch={
					{
						header: 'Opções'
					}
				}
			/>

			<Form id="usuario-form" className="form" onSubmit={ submitForm } autoComplete="off">
				{
					(!param || (data.empresa && data.empresa.ativo && checkCompanyDateLimit)) ? (
						null
					) : (
						<Alert color="danger">
							<i className="fas fa-user-slash"></i> Empresa <strong>inativa</strong> ou <strong>data limite de uso</strong> atingida
						</Alert>
					)
				}

				{
					(!param || data.ativo) ? (
						null
					) : (
						<Alert color="danger">
							<i className="fas fa-user-slash"></i> Usuário <strong>inativo</strong>
						</Alert>
					)
				}

				<div className="global-form-header">
					Dados Gerais
				</div>

				<div className="global-form-grouped">
					<Row form>
						<Col md={ 12 }>
							<FormGroup>
								<Label for="nome">Nome</Label>
								<Input type="text" value={ formElements.nome } id="nome" maxLength="200" onChange={ changeFormElements } />
							</FormGroup>
						</Col>
					</Row>

					<Row form>
						<Col md={ 6 }>
							<FormGroup>
								<Label for="email">E-mail</Label>
								<Input type="text" value={ formElements.email } id="email" maxLength="200" onChange={ changeFormElements } />
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
						<Col md={ 6 }>
							<FormGroup>
								<Label for="empresa">Empresa</Label>
								<Input type="select" value={ formElements.empresa } id="empresa" onChange={ changeFormElements }>
									<option value="">&rsaquo; selecione</option>
									{
										dataGet.content && Array.isArray(dataGet.content.empresas) ? (
											dataGet.content.empresas.map(
												(element, index) => <option value={ element.id } key={ index } disabled={ !element.ativo }>{ element.nome }{ !element.ativo ? ' (inativa)' : '' }</option>
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
									<option value="">&rsaquo; selecione</option>
									{
										dataGet.content && Array.isArray(dataGet.content.ativo) ? (
											dataGet.content.ativo.map(
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
						<Col md={ 12 }>
							<FormGroup>
								<Label for="detalhes">Detalhes</Label>
								<Input type="textarea" value={ formElements.detalhes } rows="6" id="detalhes" onChange={ changeFormElements } />
							</FormGroup>
						</Col>
					</Row>
				</div>

				<div className="global-form-grouped">
					<Row form>
						<Col md={ 12 }>
							<FormGroup>
								<Label for="perfis">Perfis</Label>
								<div id="perfis" data-value={ dataGet.content && Array.isArray(dataGet.content.perfis) && formElements.perfis }>
									<Multiple
										optionsData={ dataGet.content && dataGet.content.perfis }
										optionsKeys={
											{
												id: 'id',
												name: 'nome'
											}
										}
										optionsSelected={ formElements.perfis } id="perfis"
										handleFormElements={ handleFormElements }
									/>
								</div>
							</FormGroup>
						</Col>
					</Row>
				</div>

				<div className="global-form-grouped">
					<Row form>
						<Col md={ 12 }>
							<FormGroup>
								<Label for="files">Arquivos</Label>
								<Input type="file" id="files" onChange={ addFiles } multiple />
							</FormGroup>
							<FormText className="global-outside-group">Selecione um ou mais arquivos aqui.</FormText>
						</Col>
					</Row>
				</div>

				<hr className="global-line global-form-divider" />

				<div className="global-form-info-footer">{ data.dataCriacao ? `Usuário criado em ${data.dataCriacao}` : 'Novo usuário - a senha será enviada para o e-mail cadastrado' }</div>
			</Form>
		</Fragment>
	);
};

export default ModalForm;
