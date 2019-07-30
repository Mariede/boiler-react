import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ConfigContext from 'components/_helpers/ConfigContext';

// params => object (parametros do post, se existirem)
// config => object (configuracoes adicionais - header, etc... , se existirem)
// extraTriggers = > array (hooks para o event update no useEffect, se existirem)
const DataPost = (route, initialValue, { params, config, extraTriggers } = {}) => {
	const [values, setValues] = useState({ data: initialValue, error: {}, loading: false });

	const postUrl = React.useContext(ConfigContext).baseUrl + route;
	const postParams = JSON.stringify((params ? { params } : {}));
	const postConfig = JSON.stringify((config ? { config } : {}));
	const postExtraTriggers = (extraTriggers || []);

	useEffect(() => {
		const postThis = async () => {
			try {
				setValues({ data:initialValue, error: {}, loading: true });

				const res = await axios.post(
					postUrl,
					JSON.parse(postParams),
					JSON.parse(postConfig)
				);

				setValues({ data: res.data, error: {}, loading: false });
			} catch(err) {
				setValues({ data: initialValue, error: err, loading: false });
				throw err;
			}
		};

		postThis(); // eslint-disable-next-line
	}, [initialValue, postUrl, postParams, postConfig, ...postExtraTriggers]);

	return [ values.data, values.error, values.loading ];
};

export default DataPost;
