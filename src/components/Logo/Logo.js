import React from 'react';
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';


/*
You calling logo() function from app.js with no variables. You are using html notation
so you must use {} when editing. But for typhon commands you dont need to.
*/

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{max : 55 }} style={{ height:150, width:150}}>
    			<div className="Tilt-inner pa3">
    				<img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
    			</div>
    		</Tilt>
		</div>
	);
}

export default Logo;