import React, { useRef, useEffect } from 'react';

import ModalWindow from 'components/_common/ModalWindow';

import ModalForm from './ModalForm';

const ModalData = props => {
	const { param, data, setDataChange } = props;

	const formElements = useRef(
		{
			nome: (data && data.nome) || '',
			email: (data && data.email) || ''
		}
	);

	const renderCount = useRef(0);

	const changeFormElements = (ref, value) => {
		const prevState = formElements.current;

		formElements.current = (
			{
				...prevState,
				[ref]: value
			}
		);
	};

	const modalCallback = () => {
		setDataChange(
			prevState => (
				{
					...prevState,
					submit: true,
					data: formElements.current
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

	return (
		<ModalWindow modalTitle={ `Usuario${param ? ` ${param}` : ''}` } modalMessage={ <ModalForm _formElements={ formElements.current } _changeFormElements={ changeFormElements } _modalCallback={ modalCallback } /> } modalSize="md" modalFooterSize="md" modalCallbackPlanB={ modalCallbackPlanB } modalFormSubmitID="usuario-form" modalShow={ true } modalConfirm modalCentered key={ renderCount.current } />
	);
};

export default ModalData;
