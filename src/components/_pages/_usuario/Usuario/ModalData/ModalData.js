import React, { useRef, useEffect } from 'react';

import ModalWindow from 'components/_common/ModalWindow';

const ModalData = props => {
	const { param, data, setDataChange } = props;

	const renderCount = useRef(0);

	useEffect(
		() => {
			renderCount.current++;

			/* EM ANDAMENTO */
			// setDataChange(undefined);
			setDataChange(
				prevState => (
					{
						...prevState,
						submit: true,
						data: {
							zzz: 'next'
						}
					}
				)
			);
		}
	);

	return (
		<ModalWindow modalTitle="ghgh" modalMessage="gfgfg" modalSize="md" modalFooterSize="md" modalShow={ true } modalConfirm modalCentered key={ renderCount.current } />
	);
};

export default ModalData;
