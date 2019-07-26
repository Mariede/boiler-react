import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Config from 'components/_helpers/Config';


// params => object (parametros do get, se existirem)
// extraTriggers = > array (hooks para o event update no useEffect, se existirem)
const DataFetch = (route, initialValue, { params, extraTriggers } = {}) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(initialValue);

	const getUrl = React.useContext(Config).baseUrl + route;
	const getParams = JSON.stringify((params ? { params: params } : {}));
	const getExtraTriggers = (extraTriggers || []);

	useEffect(() => {
		const fetchThis = async function() {
			try {
				setLoading(true);

				const res = await axios.get(
					getUrl,
					JSON.parse(getParams)
				);

				if (res.status === 200) {
					setData(res.data);
				}
			} catch(err) {
				throw err;
			} finally {
				setLoading(false);
			}
		};

		fetchThis(); // eslint-disable-next-line
	}, [getUrl, getParams, ...getExtraTriggers]);

	return [ loading, data ];
};

export default DataFetch;
