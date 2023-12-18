//DEPENDENCIES
import { NavLink } from 'react-router-dom';
import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import NaviBar from '../components/Navbar';

const Home = () => {
	return (
		<div>
			<Row>
				<Col className='mt-3 col-12 justify-content-right'>
					<NaviBar />
				</Col>
			</Row>

			<Row>
				<Col className='col-4 justify-contents-top align-contents-center'>
					<div id='splashtext'>
						<h1>Shop Our Products</h1>
						<h3>Handmade baked goods delivered</h3>
						<Button className='formButton' variant="secondary" type="submit" as={NavLink} to="/store">Enter Store</Button>
					</div>
				</Col>
				<Col className='col-8'>
					<section id="hero">
						<img
							id="heroimage"
							src="/ECNFM.png"
							alt="Empire Cheesecake Logo" />
					</section>
				</Col>
			</Row>
		</div>

	);
};

export default Home;
