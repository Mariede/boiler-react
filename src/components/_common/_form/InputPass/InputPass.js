import React from 'react';

import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import './InputPass.css';

const InputPass = props => {
	const iconPassShow = 'fa-eye';
	const iconPassHide = 'fa-eye-slash';

	const showHidePass = e => {
		e.preventDefault();

		const button = e.currentTarget;
		const icon = button.querySelector('i');
		const input = button.closest('.input-pass').querySelector('input');

		if (input.type === 'password') {
			icon.classList.remove(iconPassHide);
			icon.classList.add(iconPassShow);
			input.type = 'text';
		} else {
			icon.classList.remove(iconPassShow);
			icon.classList.add(iconPassHide);
			input.type = 'password';
		}
	};

	return (
		<InputGroup className="input-pass">
			<Input type="password" { ...props } />
			<InputGroupAddon addonType="append">
				<InputGroupText onClick={ showHidePass }><i className={ `fa ${iconPassHide}` }></i></InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	);
};

export default InputPass;
