//DEPENDENCIES
import { Link } from 'react-router-dom';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NaviBar from '../components/Navbar';


//GRAPHQL
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

const Home = () => {
	return (
		<div>
			<Row>
				<Col className='mt-3 col-12 justify-content-right'>
					<NaviBar />
				</Col>
			</Row>

			<section id="hero">
				<div id='splashtext'>
					<h1>Shop Our Products</h1>
					<h3>Handmade baked goods delivered</h3>
					<button variant='outline-dark'><Link to="/store">Enter Store</Link></button>
				</div>
				<div id='logobox'>
					<img
						src="/ECNFM.png"
						alt="Empire Cheesecake Logo" />
				</div>
			</section>
		</div>
	);
};

export default Home;
