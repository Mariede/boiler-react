import React, { useRef, useEffect } from 'react';

import './PassMeter.css';

const PassMeter = props => {
	const { passValue } = props;

	const elementMeter = useRef();

	useEffect(
		() => {
			const passStrength = () => {
				const getClassResult = result => {
					let cssResult = '';

					if (result > 13) {
						cssResult = 'strong';
					} else {
						if (result > 11) {
							cssResult = 'good';
						} else {
							if (result > 9) {
								cssResult = 'moderate';
							} else {
								if (result > 7) {
									cssResult = 'poor';
								} else {
									if (result !== 0) {
										cssResult = 'weak';
									}
								}
							}
						}
					}

					return cssResult;
				};

				const _passValue = String(passValue || '');

				const passLen = _passValue.length;

				let hasLoweCase = false,
					hasUpperCase = false,
					hasNumber = false,
					hasSpecial = false,
					multiples = '',
					checkResult = 0;

				if (passLen !== 0) {
					for (let i = 0; i < passLen; i++) {
						const chSenha = _passValue.substr(i, 1);
						const chSenhaCCOD = parseInt(chSenha.charCodeAt(0), 10);

						if (!hasLoweCase) {
							if (chSenhaCCOD > 96 && chSenhaCCOD < 123) {
								// Letras minusculas
								hasLoweCase = true;
							}
						}

						if (!hasUpperCase) {
							if (chSenhaCCOD > 64 && chSenhaCCOD < 91) {
								// Letras maiusculas
								hasUpperCase = true;
							}
						}

						if (!hasNumber) {
							if (chSenhaCCOD > 47 && chSenhaCCOD < 58) {
								// 0 a 9
								hasNumber = true;
							}
						}

						if (!hasSpecial) {
							if ((chSenhaCCOD > 31 && chSenhaCCOD < 48) || (chSenhaCCOD > 57 && chSenhaCCOD < 65) || (chSenhaCCOD > 90 && chSenhaCCOD < 97) || (chSenhaCCOD > 122 && chSenhaCCOD < 127)) {
								// Caracteres especiais !"#$%&'()*+,-./:;<=>?@[\]^_´{|}~
								hasSpecial = true;
							}
						}

						if (multiples.indexOf(chSenha) === -1) {
							multiples = multiples + chSenha;
						}
					}

					if (hasLoweCase) {
						checkResult = 1 + checkResult;
					}

					if (hasUpperCase) {
						checkResult = 2 + checkResult;
					}

					if (hasNumber) {
						checkResult = 2 + checkResult;
					}

					if (hasSpecial) {
						checkResult = 2 + checkResult;
					}

					if (multiples.length >= 6) {
						checkResult = 3 + checkResult;
					}

					if (passLen >= 10) {
						checkResult = 6 + checkResult;
					} else {
						if (passLen >= 8) {
							checkResult = 4 + checkResult;
						} else {
							if (passLen >= 6) {
								checkResult = 3 + checkResult;
							}
						}
					}
				}

				return getClassResult(checkResult);
			};

			const passTextAfter = _c => {
				switch (_c) {
					case 'weak': {
						return ' fraco';
					}
					case 'poor': {
						return ' frágil';
					}
					case 'moderate': {
						return ' moderado';
					}
					case 'good': {
						return ' bom';
					}
					case 'strong': {
						return ' forte';
					}
					default: {
						return '';
					}
				}
			};

			// Mede a forca da senha
			const classToShow = passStrength();

			elementMeter.current.setAttribute('class', '');

			if (classToShow) {
				elementMeter.current.classList.add(classToShow);
			}

			elementMeter.current.innerHTML = `<i class="fas fa-lock"></i>${passTextAfter(classToShow)}`;
		}
	);

	return (
		<div className="pass-meter">
			<div className="pass-meter-graph">
				<div ref={ elementMeter }></div>
			</div>
			<div className="pass-meter-text">
				Força da Senha
			</div>
		</div>
	);
};

export default PassMeter;
