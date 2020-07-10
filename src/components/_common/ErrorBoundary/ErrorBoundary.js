import React, { Component } from 'react';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
	constructor (props) {
		super(props);

		this.state = {
			error: null,
			errorInfo: null
		};
	}

	componentDidCatch (error, errorInfo) {
		this.setState(
			{
				error: error,
				errorInfo: errorInfo
			}
		);
	}

	render () {
		if (this.state.errorInfo) {
			return (
				<div id="error-boundary">
					<h5><i className="fa fa-bug"></i> Alguma coisa deu errado...</h5>

					<div className="error-boundary-details">
						{ this.state.error && this.state.error.toString() }
						<br />
						{ this.state.errorInfo && this.state.errorInfo.componentStack }
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
