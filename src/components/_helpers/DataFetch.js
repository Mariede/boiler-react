import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Config from 'components/_helpers/Config';

const DataFetch = (route, initialValue, params = '') => {
	const [data, setData] = useState(initialValue);
	const [loading, setLoading] = useState(true);

	const getUrl = React.useContext(Config).baseUrl + route;
	const getParams = JSON.stringify((params ? { params: params } : {}));

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

		fetchThis();
	}, [getUrl, getParams]);

	return { loading, data };
};

export default DataFetch;
