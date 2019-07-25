import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

const Login = () => {
	return (
		<div id="login">
			<p><i className="fas fa-user"></i> Login</p><hr />

			<Form>
				<Row form>
					<Col md={12}>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input type="email" name="email" id="email" placeholder="e-mail" />
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
					<FormGroup>
						<Label for="senha">Password</Label>
						<Input type="password" name="senha" id="senha" placeholder="senha" />
					</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<Button type="submit" className="btn-success float-right">Enviar</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default Login;
