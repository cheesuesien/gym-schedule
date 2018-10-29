import React from 'react';

const Navigation = ({ signOut, isSignedIn, isAdmin, path, changePath }) => {
	return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<button onClick={() => signOut(isSignedIn)} >Sign out</button>
			{
				isAdmin ? 
				<button onClick={() => changePath('adduser')} >Add New User</button>
				:
				<div></div>
			}
			{
				path !== 'home' ?
				<button onClick={() => changePath('home')} >Home</button>
				:
				<div></div>
			}
        </nav>
	);
}

export default Navigation;