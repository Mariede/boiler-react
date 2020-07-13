import React from 'react';

import MainContent from 'components/_common/MainContent';

const Usuario = props => (
	<MainContent subject="Usuario" icon="fas fa-user">
		<div id="usuario">
			Detalhes usuário { props.match.params.id || 'all' }
		</div>
	</MainContent>
);

export default Usuario;
