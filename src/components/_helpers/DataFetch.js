import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Config from 'components/_helpers/Config';

// params => object (parametros do get, se existirem)
// extraTriggers = > array (hooks para o event update no useEffect, se existirem)
const DataFetch = (route, initialValue, { params, extraTriggers } = {}) => {
	const [values, setValues] = useState({ data: initialValue, error: {}, loading: false });

	const getUrl = React.useContext(Config).baseUrl + route;
	const getParams = JSON.stringify((params ? { params: params } : {}));
	const getExtraTriggers = (extraTriggers || []);

	useEffect(() => {
		const fetchThis = async () => {
			try {
				setValues({ data: values.data, error: values.error, loading: true });

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
	}, [getUrl, getParams, ...getExtraTriggers]);

	return [ values.data, values.error, values.loading ];
};

export default DataFetch;
