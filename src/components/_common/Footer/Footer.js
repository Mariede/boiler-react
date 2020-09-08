import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import './Footer.css';

/*
	DEPENDENCIAS:
		- Reactstrap
*/
const Footer = () => (
	<footer id="footer">
		<Container fluid={ true }>
			<Row>
				<Col md={ 6 }>
					Footer da aplicação
				</Col>
				<Col md={ 6 }>
					versão { (process.env.REACT_APP_VERSION || 'N/D') }
				</Col>
			</Row>
		</Container>
	</footer>
);

export default Footer;
