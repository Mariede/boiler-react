import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import PageSubject from 'components/_common/PageSubject';

import imgNotFound from 'assets/images/not-found.png';

import './NotFound.css';

const NotFound = props => {
	const navBack = e => {
		e.preventDefault();
		props.history.goBack();
	};

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

				<hr />
				<Row form>
					<Col md={6}>
						<Button type="button" color="primary" block onClick={ navBack }>Voltar</Button>
					</Col>
					<Col md={6}>
						<Button type="button" color="success" block tag={ Link } to="/">Home</Button>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default NotFound;
