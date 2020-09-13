import React, { useRef, useEffect } from 'react';

import ModalWindow from 'components/_common/ModalWindow';

import ModalForm from './ModalForm';

/*
	** Componente de apoio para DataChange na exibicao do modal de transformacao dos dados **

	PROPS:
		- param			: parametro de rota (ID)
		- data			: dados do corpo da requisicao, se existirem
		- formId 		: identificador do formulario
		- setDataChange	: funcao de estado em parent que controla as propriedades do componente
*/
const DataModal = props => {
	const { param, data, formId, setDataChange } = props;

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
		<ModalWindow modalTitle={ `Registro ${param ? ` ${param}` : ''}` } modalMessage={ <ModalForm data={ data } setDataChange={ setDataChange } /> } modalSize="md" modalFooterSize="md" modalCallbackPlanB={ modalCallbackPlanB } modalFormSubmitID={ formId } modalShow={ true } modalConfirm modalCentered key={ renderCount.current } />
	);
};

export default DataModal;
