import React from 'react';

/*
Calling navigation function from App.js with onRoutChange and isSignIn variables in HTML format,
You are using arrow function which save time and space. 
classNames have typhon commands to edit 
html commands are used to edit aswell in {}

MEthod USE:
If the user is signed in, than change the top right link to Signout and its onRouteChange
else, if not that keep as two buttong os Sign In with route link Sign in page, and 
register with register page route link

*/

const Navigation = ({onRouteChange, isSignedIn}) => {
		if(isSignedIn) {
			return(
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			);
		}
		else {
			return(
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
					<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
				</nav>
		    );
		}
}

export default Navigation;