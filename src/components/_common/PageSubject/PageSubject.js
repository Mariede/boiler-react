import React from 'react';

import './PageSubject.css';

/*
	PROPS:
		- icon				-> (font-awesome, default: "fas fa-thumbtack")
		- subject
*/
const PageSubject = props => {
	return (
		<div id="pageSubject">
			<i className={ (props.icon || 'fas fa-thumbtack') }></i> { (props.subject || '') }<hr />
		</div>
	);
};

export default PageSubject;
