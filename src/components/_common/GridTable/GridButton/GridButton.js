import React, { useMemo } from 'react';

import { Button } from 'reactstrap';

import Alert from 'components/_common/Alert';

/*
	PROPS:
		id				-> ID DOM do botao (gerado automaticamente em parent GridTable)

		record			-> linha do recordset do botao no grid

		gridCallback	-> callback do parent no botao

		buttonText		-> define o texto do botao (pode ser string ou jsx)

		buttonColor		-> define o formato do button - default e link (string)
				-> ex. link, danger, success, ...

		buttonConfirm	-> opcional e define se havera um modal de confirmacao para a acao (string)
				-> contem o texto a ser exibido no modal

			** buttonText e buttonColor podem tambem ser arrays com validacoes booleanas exclusivas
				-> Obrigatorio 3 itens na array:
					-> array[0]: elemento json de checagem (deve existir no json, pode ser aninhado)
					-> array[1]: exibe se array[0] for true
					-> array[2]: exibe se array[0] for false
*/
const GridButton = props => {
	const { id, record, gridCallback, buttonColor, buttonText, buttonConfirm } = props;

	const applyButtonStyle = (rec, arg, iniVal) => {
		let buttonStyleResult = iniVal;

		if (typeof arg === 'string' || React.isValidElement(arg)) {
			buttonStyleResult = arg;
		} else {
			if (Array.isArray(arg)) {
				if (arg.length === 3) {
					const checkData = arg[0].split('.').reduce((o, i) => o[i], rec);

					if (checkData !== undefined) {
						if (checkData) {
							buttonStyleResult = arg[1];
						} else {
							buttonStyleResult = arg[2];
						}
					}
				}
			}
		}

		return buttonStyleResult;
	};

	const checkButtonStyleColor = useMemo(
		() => (
			applyButtonStyle(record, buttonColor, 'link')
		),
		[record, buttonColor]
	);

	const checkButtonStyleText = useMemo(
		() => (
			applyButtonStyle(record, buttonText, 'no-text')
		),
		[record, buttonText]
	);

	return (
		buttonConfirm ? (
			<Alert buttonId={ id } buttonType="button" buttonSize="sm" buttonColor={ checkButtonStyleColor } buttonText={ checkButtonStyleText } modalTitle="Dados" modalMessage={ buttonConfirm } modalCallback={ gridCallback } modalConfirm />
		) : (
			<Button id={ id } type="button" size="sm" color={ checkButtonStyleColor } onClick={ gridCallback }>{ checkButtonStyleText }</Button>
		)
	);
};

export default GridButton;
