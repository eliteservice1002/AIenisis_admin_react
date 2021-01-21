import React from 'react';
import useAuth from 'src/hooks/useAuth';


const Logo = (props) => {
	const { user, logout } = useAuth();
	const styleWapper = {
		padding: '15px',
		display: 'block',
		maxWidth: '150px',
	}

	const styleLogo = {
		width: '100%',
		display: 'block'
	}

	const urlImage = {
		white: '/static/images/logo.svg',
		color: '/static/images/logo.svg'
	}

	const renderLogo = () => {
		let pathLogo;
		if(user && user.company) {
			pathLogo = user.company.full_logo_path;
		}

		if(!pathLogo) {
			pathLogo = (props.color) ? urlImage.color : urlImage.white;
		} else {
			pathLogo = process.env.REACT_APP_BASE_URL + pathLogo;
		}

		return(
			<img
				alt="Logo"
				{...props}
				src={pathLogo}
				style={styleLogo}
			/>
		)
	}

	return (
		<span style={styleWapper}>
		{renderLogo()}
		</span>
	);
}

export default Logo;
