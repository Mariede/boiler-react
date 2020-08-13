import React from 'react';

import './PageSubject.css';

/*
	PROPS:
		- icon				-> (font-awesome, default: "fas fa-thumbtack")
		- subject
*/
const PageSubject = props => {
	const { icon, subject } = props;

	return (
		<div id="page-subject">
			<i className={ (icon || 'fas fa-thumbtack') }></i> { (subject || '') }<hr />
		</div>
	);
};

export default PageSubject;
