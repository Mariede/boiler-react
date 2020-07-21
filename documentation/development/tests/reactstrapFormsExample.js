import React from 'react';

import { Form, FormGroup, Label, Input, FormText, Button, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';

const ReactComponent = () => (
	<MainContent subject="Form" icon="fas fa-sign-in-alt">
		<div id="form">
			<Form id="id-form" className="form">
				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="text">Text</Label>
							<Input type="text" value="" id="text" placeholder="seu@email" />
							<FormText>Text aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="pass">Senha</Label>
							<Input type="password" value="" id="pass" placeholder="S3nh4" />
							<FormText>Pass aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<legend>Radio Buttons</legend>
							<FormGroup check>
								<Label check>
									<Input type="radio" name="radio1" /> Option one is this
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="radio" name="radio1" /> Option two can be something
								</Label>
							</FormGroup>
							<FormGroup check disabled>
								<Label check>
									<Input type="radio" name="radio1" disabled /> Option three is disabled
									<br />
								</Label>
							</FormGroup>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<legend>Check Buttons</legend>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" name="check1" /> Check me out
								</Label>
							</FormGroup>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="exampleFile">File</Label>
							<Input type="file" name="file" id="exampleFile" multiple />
							<FormText>File multiple aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="exampleSelectOne">Select</Label>
							<Input type="select" name="selectOne" id="exampleSelectOne">
								<option value="">-- preencher</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</Input>
							<FormText>Select one aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="exampleSelectMulti">Select Multi</Label>
							<Input type="select" name="selectMulti" id="exampleSelectMulti" size="5" multiple>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</Input>
							<FormText>Select multi aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label for="exampleTextArea">Text Area</Label>
							<Input type="textarea" name="textArea" id="exampleTextArea" />
							<FormText>Textarea aqui.</FormText>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={ 12 }>
						<FormGroup>
							<Label>Campo duplo</Label>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>$</InputGroupText>
								</InputGroupAddon>
								<Input type="text" id="test-pre" placeholder="pre" />
								<Input type="text" id="test-pos" placeholder="pos" />
								<InputGroupAddon addonType="append">
									<InputGroupText>$</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					</Col>
				</Row>

				<hr />

				<Row form>
					<Col md={ 12 }>
						<Button type="submit" color="success" block>Enviar</Button>
					</Col>
				</Row>
			</Form>
		</div>
	</MainContent>
);

export default ReactComponent;
