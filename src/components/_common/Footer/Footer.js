import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import './Footer.css';

const Footer = () => (
	<footer id="footer">
		<Container fluid="md">
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
