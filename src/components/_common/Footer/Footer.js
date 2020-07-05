import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './Footer.css';

const Footer = () => {
	return (
		<footer id="footer">
			<Container fluid>
				<Row>
					<Col md={ 6 }>
						Footer da aplicação
					</Col>
					<Col md={ 6 }>
						versão
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
