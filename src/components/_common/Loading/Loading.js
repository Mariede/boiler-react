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

	const { loading, message } = props;

	useEffect(
		() => {
			const timer = setTimeout(
				() => {
					if (loading) {
						setShowLoading(true);
					}
				}, 500
			);

			return () => {
				setShowLoading(false);
				clearTimeout(timer);
			};
		},
		[loading]
	);

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
