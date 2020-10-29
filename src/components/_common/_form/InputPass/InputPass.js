import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import './InputPass.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS:
		- Atributos do elemento Input
*/
const InputPass = props => {
	const iconPassShow = 'fa-eye';
	const iconPassHide = 'fa-eye-slash';

	const showHidePass = e => {
		const button = e.currentTarget;
		const input = button.closest('.input-pass').querySelector('input');

		if (!input.disabled) {
			const icon = button.querySelector('i');

			if (input.type === 'password') {
				icon.classList.remove(iconPassHide);
				icon.classList.add(iconPassShow);
				input.type = 'text';
			} else {
				icon.classList.remove(iconPassShow);
				icon.classList.add(iconPassHide);
				input.type = 'password';
			}
		}
	};

	const checkEnterPressed = e => {
		e.preventDefault();

		if (e.key === 'Enter') {
			showHidePass(e);
		}
	};

	const checkClicked = e => {
		e.preventDefault();
		showHidePass(e);
	};

	return (
		<InputGroup className="input-pass">
			<Input type="password" { ...props } autoComplete="new-password" />
			<InputGroupAddon addonType="append">
				<InputGroupText tabIndex="0" role="button" onKeyPress={ checkEnterPressed } onClick={ checkClicked }><i className={ `fas ${iconPassHide}` }></i></InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	);
};

export default InputPass;
