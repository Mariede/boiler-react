import React from 'react';

import './Home.css';

const Home = () => {
	return (
		<div id="home">
			<div className="welcome">
				<i className="fas fa-sitemap"></i>
				<br />Boiler React<hr />
				<div className="description">Projeto de Boilerplate usando o Create React App</div>
			</div>
		</div>
	);
};

export default Home;
