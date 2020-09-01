const errWrapper = (err, origin = '') => {
	console.error(origin, err); // eslint-disable-line no-console
};

export default errWrapper;
