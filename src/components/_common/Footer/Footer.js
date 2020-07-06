import React from 'react';

import { Row, Col } from 'reactstrap';

import './Footer.css';

const Footer = () => (
	<footer id="footer">
		<Row>
			<Col md={ 6 }>
				Footer da aplicação
			</Col>
			<Col md={ 6 }>
				versão
			</Col>
		</Row>
	</footer>
);

export default Footer;
