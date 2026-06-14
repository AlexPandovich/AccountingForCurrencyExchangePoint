import {  NavLink } from "react-router-dom";
import "./navBar.scss"

function NavBar() {
	return ( 
		<div className="navbar">
			<div className="logo">
				<div>
					<img src="test.svg" alt="" />
				</div>
				<div>
					<img src="text.svg" alt="" />
				</div>
			</div>
			<div className="navbar_items">
		  		<NavLink to="/" className={({ isActive}) => isActive? "active": ""}> <button>День</button> </NavLink>
		  		<NavLink to="/month">
					<button>Месяц</button> 
				</NavLink>
			</div>
	  	</div>
	 );
}

export default NavBar;