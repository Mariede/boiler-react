import React, { Fragment } from 'react';

import { Container } from 'reactstrap';

import PageSubject from './PageSubject';

import './MainContent.css';

/*
	PROPS:
		- icon				-> (font-awesome, default: "fas fa-thumbtack")
		- subject
*/
const MainContent = props => {
	const { subject, icon, children } = props;

	return (
		<Fragment>
			<PageSubject subject={ subject } icon={ icon } />
			<div id="main-content">
				<Container fluid="md">
					{ children }
				</Container>
			</div>
		</Fragment>
	);
};

export default MainContent;
