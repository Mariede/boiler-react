import React from 'react';

import './PageSubject.css';

const PageSubject = props => {
	return (
		<div id="pageSubject">
			<i className={ (props.icon || 'fas fa-thumbtack') }></i> { (props.subject || '') }<hr />
		</div>
	);
};

export default PageSubject;
