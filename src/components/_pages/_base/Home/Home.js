import React from 'react';

import PageSubject from 'components/_common/PageSubject';

import './Home.css';

const Home = () => (
	<div id="home">
		<PageSubject subject="Home" icon="fas fa-home" />
		<div className="main-content">
			<i className="fas fa-sitemap"></i>
			<br />Boiler React<hr />
			<div className="description">Projeto de Boilerplate usando o Create React App</div>
		</div>
	</div>
);

export default Home;
