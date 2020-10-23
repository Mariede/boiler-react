import { Fragment, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import InputMask from 'react-input-mask';

import Multiple from 'components/_common/_form/Multiple';
import InputPass from 'components/_common/_form/InputPass';
import PassMeter from 'components/_common/PassMeter';
import DataGet from 'components/_common/DataGet';

import formValidator from 'helpers/formValidator';
import functions from 'helpers/functions';

const ModalForm = props => {
	const { param, data, setDataChange } = props;

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
			tipo: (data.tipo && data.tipo.id) || '',
			ativo: (data.ativo ? true : (data.ativo === false ? false : '')),
			cep: (data.cep ? String(data.cep).padStart(8, '0') : ''), // Mascara no formulario
			cpf: (data.cpf ? String(data.cpf).padStart(11, '0') : ''), // Mascara no formulario
			detalhes: data.detalhes || '',
			perfis: functions.getArrayOnly(data.perfis, 'id'),
			senha: '',
			senhaCheck: ''
		}
	);

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
		},
		{
			id: 'detalhes',
			optional: true,
			rules: [
				{
					rule: 'lenRange',
					message: 'Detalhes deve conter entre 5 e 8000 caracteres',
					extraParams: [5, 8000]
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
		},
		{
			id: 'senha',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Senha não preenchida'
				}
			]
		},
		{
			id: 'senhaCheck',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Confirmação de senha não preenchida'
				},
				{
					rule: 'isEqual',
					message: 'Confirmação de senha não confere',
					extraParams: [formElements.senha]
				}
			]
		}
	];

	const initiateFormValidation = () => {
		formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 3
	};

	const executeFormValidation = () => {
		formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 3
	};

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

	useEffect(
		initiateFormValidation,
		[]
	);

	useEffect(
		executeFormValidation
	);

	// Define as opcoes do Modal (DataGet) - nao executa DataGet se as opcoes ja vierem via props
	const options = (data.options || dataGet.content);

	return (
		<Fragment>
			<DataGet
				goReady={ data.options }
				cbThen= {
					res => {
						data.options = res.data; // Atalho para dados das opcoes (data.options === dataGet.content)
					}
				}
				setDataGet={ setDataGet }
				baseRoute="/usuario/options"
				cbCatch={
					{
						header: 'Opções'
					}
				}
			/>

			<Form id="usuario-form" className="form" onSubmit={ submitForm } autoComplete="off">
				<div className="global-form-header">
					Dados Gerais
				</div>

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
								<option value="">&rsaquo; selecione</option>
								{
									options && Array.isArray(options.tipos) ? (
										options.tipos.map(
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
								<option value="">&rsaquo; selecione</option>
								{
									options && Array.isArray(options.ativo) ? (
										options.ativo.map(
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
							<Label for="detalhes">Detalhes</Label>
							<Input type="textarea" value={ formElements.detalhes } rows="6" id="detalhes" onChange={ changeFormElements } />
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="perfis">Perfis</Label>
							<div id="perfis" data-value={ options && Array.isArray(options.perfis) && formElements.perfis }>
								<Multiple optionsData={ options && options.perfis } optionsKeys={ { id: 'id', description: 'nome' } } optionsSelected={ formElements.perfis } id="perfis" handleFormElements={ handleFormElements } />
							</div>
						</FormGroup>
					</Col>
				</Row>

				{
					!param ? (
						<Fragment>
							<div className="global-form-header">
								Senha
							</div>

							<Row form>
								<Col md={ 6 }>
									<FormGroup>
										<Label for="senha">Senha</Label>
										<Input type="password" value={ formElements.senha } id="senha" maxLength="20" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
								<Col md={ 6 }>
									<FormGroup>
										<Label for="senhaCheck">Confirma senha</Label>
										<InputPass value={ formElements.senhaCheck } id="senhaCheck" maxLength="20" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>

							<Row form>
								<Col md={ { offset: 1, size: 10 } }>
									<FormGroup>
										<PassMeter passValue={ formElements.senha } />
									</FormGroup>
								</Col>
							</Row>
						</Fragment>
					) : (
						null
					)
				}

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="files">Arquivos</Label>
							<Input type="file" id="files" onChange={ addFiles } multiple />
						</FormGroup>
						<FormText className="global-outside-group">Selecione um ou mais arquivos aqui.</FormText>
					</Col>
				</Row>

				<hr className="global-line global-form-divider" />
			</Form>
		</Fragment>
	);
};

export default ModalForm;
