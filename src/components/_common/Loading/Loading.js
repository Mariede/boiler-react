import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'reactstrap';

import './Loading.css';

/*
	PROPS:
		- loading			-> OBRIGATORIO, informa inicio e termino da tela de loading
		- message			-> (default: "Aguarde...")
*/
const Loading = props => {
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (props.loading) {
			setShowLoading(true);
		}

		return () => {
			setShowLoading(false);
		};
	}, [props.loading]);

	const CheckLoading = () => {
		let Component = null;

		if (showLoading) {
			Component = (
				<div id="loading">
					<div className="message">
						<Spinner color="info" />
						<br />
						{ (props.message || 'Aguarde...') }
					</div>
				</div>
			);
		}

		return Component;
	};

	return (
		ReactDOM.createPortal(
			<CheckLoading />,
			document.getElementById('root')
		)
	);
};

export default Loading;
