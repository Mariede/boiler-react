import validator from './rules/validator'; // Regras de validacao (copiado do boiler-server)

/*
As regras sao acopladas aqui, interfaceando o arquivo validator.js
	-> name: nome da regra no front-end (obrigatorio)
	-> validatorFunction: funcao booleana de validacao contida no arquivo validator.js (obrigatorio)
	-> extraParams: parametro extras exigidos por validatorFunction na regra - sempre array (opcional, se nao informado default e [])
	-> negateResult: inverte o valor booleano no resultado de validatorFunction na regra (opcional, se nao informado default e false - mantem original)
	-> defaultMessage: mensagem default para a regra (opcional)
		-> se nao informado utiliza o valor de message em rules na pagina de origem (configFormValidation) ou o valor generico default em formValidator.js
		-> a orderm de prioridades para informar a mensagem e:
			1) propriedade message em rules na pagina de origem (configFormValidation)
			2) valor definido em defaultMessage aqui
			3) valor generico default na pagina do motor de regras (formValidator.js)

Formato de configFormValidation na pagina de origem (exemplo Logon.js)
	-> A pagina onde sera acoplado o formValidator.js usa o seguinte formato para identificacao das regras no formulario:
		-> id ou name para elemento unico (text, select ou file, ...)
		-> name para colecao (radio, checkbox, ...)
		-> optional informa se o campo e opcional, ou seja, nao realiza validacao para vazio (default e false)
		-> rules define a sequencia de regras a serem utilizadas para o campo (uma ou mais regras)

		const configFormValidation = [
			{
				id: 'elementid',
				optional: false,
				rules: [
					{
						rule: 'ruleName',
						message: 'errorMessaToShow'
					},
					...
				]
			},
			{
				name: 'elementsName',
				rules: [
					...
				]
			},
			...
		}
*/
const apiRules = [
	{
		name: 'isNotEmpty',
		validatorFunction: validator.isEmpty,
		extraParams: [false],
		negateResult: true
	},
	{
		name: 'isNotEmptyTrimmed',
		validatorFunction: validator.isEmpty,
		negateResult: true
	},
	{
		name: 'isEmail',
		validatorFunction: validator.isEmail
	}
];

export default apiRules;