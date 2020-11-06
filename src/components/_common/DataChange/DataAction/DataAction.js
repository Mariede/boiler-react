import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './DataAction.css';

const DataAction = props => {
	const { goDataAction, showConfirm, url } = props;

	const history = useHistory();

	const elementConfirm = useRef();

	useEffect(
		() => {
			if (goDataAction) {
				if (showConfirm) {
					const _elementConfirm = elementConfirm.current;

					if (_elementConfirm) {
						_elementConfirm.style.display = 'block';
					}
				} else {
					history.push(url);
				}
			}
		},
		[goDataAction, showConfirm, history, url]
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
		<div ref={ elementConfirm } className="data-action-message-action">
			<div tabIndex="0" role="button" onKeyPress={ dataAction } onClick={ dataAction } className="data-action-message-action-box">
				Ação concluída com êxito!
			</div>
		</div>
	);

	return (
		showConfirm ? (
			Component
		) : (
			null
		)
	);
};

export default DataAction;
