import React from 'react';

import PageSubject from 'components/_common/PageSubject';

const Usuario = props => {
	return (
		<div id="usuario">
			<PageSubject subject="Usuario" icon="fas fa-user" />
			<div className="main-content">
				Detalhes usuário
			</div>
		</div>
	);
};

export default Usuario;
