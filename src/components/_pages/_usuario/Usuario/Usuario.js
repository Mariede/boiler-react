import React, { Fragment } from 'react';

import MainContent from 'components/_common/MainContent';
import GridTable from './GridTable';

import useDataGet from 'components/_custom-hooks/useDataGet';

const Usuario = props => {
	const { match, location } = props;

	const paramId = match.params.id;
	const currentKey = location.key;
	const urlParams = new URLSearchParams(location.search);

	const [Component, dataReady, dataContent] = useDataGet(
		{
			route: `/usuario${paramId ? `/${paramId}` : ''}`,
			currentKey: currentKey,
			params: {
				page: (urlParams.get('page') || 1),
				items_per_page: urlParams.get('items_per_page')
			},
			cbCatch: {
				header: 'Usuario',
				type: 4
			}
		}
	);

	return (
		<Fragment>
			{ Component }
			<MainContent subject={ `Usuario${!paramId ? ' (todos)' : ''}` } icon="fas fa-user">
				<div id="usuario">
					<GridTable dataReady={ dataReady } dataContent={ dataContent } />
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Usuario;
