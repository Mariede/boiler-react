import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'reactstrap';

import './Loading.css';

const Loading = props => {
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (props.loading) {
			setShowLoading(true);
		} else {
			setShowLoading(false);
		}

		return () => {
			setShowLoading(false);
		}
	}, [props.loading]);

	const checkLoading = () => {
		let Component = null;

		if (showLoading) {
			Component = (
				<div id="loading">
					<div className="message">
						<Spinner color="info" />
						<br />
						{ (props.message || 'Loading...') }
					</div>
				</div>
			);
		}

		return ReactDOM.createPortal(Component, document.getElementById('loading_p'));
	};

	return checkLoading();
};

export default Loading;
