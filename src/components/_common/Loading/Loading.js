import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Loading.css';

/*
	PROPS:
		- loading			-> OBRIGATORIO, informa inicio e termino da tela de loading
		- message			-> (default: "Aguarde...")
*/
const Loading = props => {
	const { loading, message } = props;

	const [showLoading, setShowLoading] = useState(false);

	useEffect(
		() => {
			const timer = setTimeout(
				() => {
					if (loading) {
						setShowLoading(true);
					}
				}, 800
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
					<i className="fas fa-cog fa-spin"></i>
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
