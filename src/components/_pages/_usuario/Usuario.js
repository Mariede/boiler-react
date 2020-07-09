import React from 'react';

import PageSubject from 'components/_common/PageSubject';

const Usuario = props => (
	<div id="usuario">
		<PageSubject subject="Usuario" icon="fas fa-user" />
		<div className="main-content">
			Detalhes usuário { props.match.params.id || 'all' }
		</div>
	</div>
);

export default Usuario;
