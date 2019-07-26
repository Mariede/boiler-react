import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import PageSubject from 'components/_common/PageSubject';

import './Login.css';

const Login = props => {
	return (
		<div id="login">
			<PageSubject subject="Login" icon="fas fa-sign-in-alt" />
			<div className="main-content">
				<Form id="loginForm">
					<Row form>
						<Col md={12}>
							<FormGroup>
								<Label for="email">Email</Label>
								<Input type="email" name="email" id="email" placeholder="seu@email" />
							</FormGroup>
						</Col>
					</Row>
					<Row form>
						<Col md={12}>
						<FormGroup>
							<Label for="senha">Senha</Label>
							<Input type="password" name="senha" id="senha" placeholder="senha" />
						</FormGroup>
						</Col>
					</Row>
					<hr />
					<Row form>
						<Col md={12}>
							<Button type="submit" color="success" block>Enviar</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default Login;