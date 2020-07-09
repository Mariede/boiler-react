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

	const isLoading = props.loading;
	const message = props.message;

	useEffect(() => {
		const timer = setTimeout(
			() => {
				if (isLoading) {
					setShowLoading(true);
				}
			}, 1000
		);

		return () => {
			setShowLoading(false);
			clearTimeout(timer);
		};
	}, [isLoading]);

	const Component = () => (
		showLoading ? (
			<div id="loading">
				<div className="message">
					<Spinner color="info" />
					<br />
					{ (message || 'Aguarde...') }
				</div>
			</div>
		) : (
			null
		)
	);

	return (
		ReactDOM.createPortal(
			<Component />,
			document.getElementById('root')
		)
	);
};

export default Loading;
