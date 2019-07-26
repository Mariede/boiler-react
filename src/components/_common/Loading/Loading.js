import React from 'react';
import { Spinner } from 'reactstrap';

import './Loading.css';

const Loading = props => {
	const checkLoading = () => {
		let Component = null;

		if (props.loading) {
			Component = (
				<div id="loading">
					<div className="message">
						<Spinner color="info" />
						<br />
						{ props.message }
					</div>
				</div>
			);
		}

		return Component;
	};

	return checkLoading();
};

export default Loading;
