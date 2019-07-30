import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

import './Loading.css';

const Loading = props => {
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (props.loading) {
			setShowLoading(true);
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

		return Component;
	};

	return checkLoading();
};

export default Loading;
