import React, { useRef, useEffect } from 'react';

import ModalWindow from 'components/_common/ModalWindow';

/*
	** Componente de apoio para DataChange na exibicao do modal de transformacao dos dados **

	DEPENDENCIAS:
		- ModalWindow

	PROPS:
		- param			: parametro de rota (ID)
		- data			: dados do corpo da requisicao, se existirem
		- formId		: identificador do formulario
		- setDataChange	: funcao de estado em parent que controla as propriedades do componente
		- ChildContent	: formulario com a tela de apoio para insert/update
*/
const DataModal = props => {
	const { param, data, formId, setDataChange, ChildContent } = props;

	const renderCount = useRef(0);

	const modalCallbackPlanB = () => {
		setDataChange(undefined);
	};

	useEffect(
		() => {
			renderCount.current++;
		}
	);

	return (
		<ModalWindow modalTitle={ `Registro ${param ? ` ${param}` : ''}` } modalMessage={ <ChildContent data={ (data || {}) } setDataChange={ setDataChange } /> } modalCallbackPlanB={ modalCallbackPlanB } modalFormSubmitID={ formId } modalShow={ true } modalConfirm modalCentered key={ renderCount.current } />
	);
};

export default DataModal;
