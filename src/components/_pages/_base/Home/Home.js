import MainContent from 'components/_common/MainContent';

import './Home.css';

const Home = () => (
	<MainContent subject="Home" icon="fas fa-home" maxContent={ true }>
		<div id="home">
			<i className="fas fa-sitemap"></i>
			<br />Boiler React

			<hr />

			<div className="description">Projeto de Boilerplate com reacts-scripts</div>
		</div>
	</MainContent>
);

export default Home;
