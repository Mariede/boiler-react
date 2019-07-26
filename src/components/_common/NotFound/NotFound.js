import React from 'react';
import { Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import PageSubject from 'components/_common/PageSubject';

import imgNotFound from 'assets/images/not-found.png';

import './NotFound.css';

const NotFound = () => {
	return (
		<div id="notFound">
			<PageSubject subject="Informação: Erro 404" icon="fas fa-exclamation" />
			<div className="main-content">
				<div className="info">
					4 <img className="img-not-found" src={ imgNotFound } alt="not-found" /> 4
				</div>

				<div className="description">
					Página não encontrada
				</div>

				<Row form>
					<Col md={12}>
						<hr /><Button type="button" className="btn-success float-right">Home</Button>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default NotFound;
