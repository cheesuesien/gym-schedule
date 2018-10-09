import React from 'react';

const Navigation = ({ signOut, isSignedIn }) => {
	return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<button onClick={() => signOut(isSignedIn)} >Sign out</button>
        </nav>
	);
}

export default Navigation;