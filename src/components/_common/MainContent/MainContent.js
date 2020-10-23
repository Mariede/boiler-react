import { Fragment } from 'react';

import { Container } from 'reactstrap';

import PageSubject from './PageSubject';

import './MainContent.css';

/*
	DEPENDENCIAS:
		- PageSubject
		- Reactstrap

	PROPS:
		- icon				-> (font-awesome, default: "fas fa-thumbtack")
		- subject
		- maxContent		-> Opcional, se true width e o tamanho do conteudo
*/
const MainContent = props => {
	const { subject, icon, maxContent, children } = props;

	return (
		<Fragment>
			<PageSubject subject={ subject } icon={ icon } />
			<div id="main-content" className={ maxContent ? 'main-content-max-content' : 'main-content-fixed' }>
				<Container fluid={ true }>
					{ children }
				</Container>
			</div>
		</Fragment>
	);
};

export default MainContent;
