import React, { Fragment } from 'react';

import { Container } from 'reactstrap';

import PageSubject from 'components/_common/MainContent/PageSubject';

import './MainContent.css';

/*
	PROPS:
		- icon				-> (font-awesome, default: "fas fa-thumbtack")
		- subject
*/
const MainContent = props => (
	<Fragment>
		<PageSubject subject={ props.subject } icon={ props.icon } />
		<div id="main-content">
			<Container fluid="md">
				{ props.children }
			</Container>
		</div>
	</Fragment>
);

export default MainContent;
