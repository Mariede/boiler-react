import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';

import imgNotFound from 'assets/images/not-found.png';

import './NotFound.css';

const NotFound = props => {
	const { history } = props;

	const navBack = e => {
		e.preventDefault();
		history.goBack();
	};

	return (
		<MainContent subject="Aviso" icon="fas fa-exclamation-triangle" maxContent={ true }>
			<div id="not-found">
				<div className="info">
					4 <img src={ imgNotFound } alt="not-found" className="img-not-found" /> 4
				</div>

				<div className="description">
					Página não encontrada
				</div>

				<hr className="global-line" />

				<Row form>
					<Col md={ 6 }>
						<Button type="button" size="md" color="primary" block onClick={ navBack }>Voltar</Button>
					</Col>
					<Col md={ 6 }>
						<Button type="button" size="md" color="success" block tag={ Link } to="/">Home</Button>
					</Col>
				</Row>
			</div>
		</MainContent>
	);
};

export default NotFound;
