import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core"

class Navbar extends React.Component {
	render() {
		return(
			<div>
				<Button
				  variant="contained"
				  color="primary"
				  component={Link}
				  to="/"
				>
					Home
				</Button>
				<Button
				  variant="contained"
				  color="primary"
				  component={Link}
				  to="/signup"
				>
					Sign Up
				</Button>
				<Button
				  variant="contained"
				  color="primary"
				  component={Link}
				  to="/login"
				>
					Sign In
				</Button>
				<Button
				  variant="contained"
				  color="primary"
				  component={Link}
				  to="/get-users"
				>
					Get users
				</Button>
			</div>
		);
	}
}

export default Navbar;
