import { useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';

import './DataAction.css';

/*
	** Componente de apoio para DataChange na exibicao da mensagem informativa **

	PROPS:
		goDataAction		: Indica se a acao foi concluida ok para redirect
		showActionInfo		: Indica realiza o redirect ou informa popup informativo
		url					: url de redirect
*/
const DataAction = props => {
	const { goDataAction, showActionInfo, url } = props;

	const history = useHistory();

	const elementConfirm = useRef();

	useLayoutEffect(
		() => {
			if (goDataAction) {
				if (showActionInfo) {
					const _elementConfirm = elementConfirm.current;

					if (_elementConfirm) {
						_elementConfirm.style.display = 'block';
					}
				} else {
					history.push(url);
				}
			}
		},
		[goDataAction, showActionInfo, history, url]
	);

	const dataAction = e => {
		e.preventDefault();

		const _elementConfirm = elementConfirm.current;

		if (_elementConfirm) {
			_elementConfirm.style.display = 'none';
			history.push(url);
		}
	};

	const Component = (
		showActionInfo ? (
			<div ref={ elementConfirm } className="data-action">
				<div tabIndex="0" role="button" onKeyPress={ dataAction } onClick={ dataAction } className="data-action-box">
					<div className="header">
						<i className="fas fa-check"></i> Sucesso
					</div>

					<hr />

					<div className="body">
						<i className="fas fa-thumbs-up"></i>
						<br />
						{ typeof showActionInfo === 'string' ? showActionInfo : 'Ação concluída com êxito!' }
						<br />
						<span>Clique para continuar...</span>
					</div>
				</div>
			</div>
		) : (
			null
		)
	);

	return (
		ReactDOM.createPortal(
			Component,
			document.getElementById('root')
		)
	);
};

export default DataAction;
