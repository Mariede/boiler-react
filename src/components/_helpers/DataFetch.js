import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ContextConfig from 'components/_helpers/ContextConfig';

// params => object (parametros do get, se existirem)
// extraTriggers = > array (hooks para o event update no useEffect, se existirem)
const DataFetch = (route, initialValue, { params, extraTriggers } = {}) => {
	const getUrl = React.useContext(ContextConfig).baseUrl + route;

	const [values, setValues] = useState({ data: initialValue, error: {}, loading: false });

	const getParams = JSON.stringify((params ? { params: params } : {}));
	const getExtraTriggers = (extraTriggers || []);

	useEffect(() => {
		const fetchThis = async () => {
			try {
				setValues({ data: initialValue, error: {}, loading: true });

				const res = await axios.get(
					getUrl,
					JSON.parse(getParams)
				);

				setValues({ data: res.data, error: {}, loading: false });
			} catch(err) {
				setValues({ data: initialValue, error: err, loading: false });
				throw err;
			}
		};

		fetchThis(); // eslint-disable-next-line
	}, [initialValue, getUrl, getParams, ...getExtraTriggers]);

	return [ values.data, values.error, values.loading ];
};

export default DataFetch;
