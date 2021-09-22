import React, {useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { TextField, Card, CardContent, CardActions, CardHeader, Button } from "@material-ui/core";

import axios from 'axios';

type State = {
	username: string,
	password: string,
	isButtonDisabled: boolean,
	helperText: string,
	isError: boolean
};
const initialState:State = {
	username: '',
	password: '',
	isButtonDisabled: true,
	helperText: '',
	isError: false
};

const API_ENDPOINT:string = "https://57eardlz1m.execute-api.ap-northeast-1.amazonaws.com/dev";

type Action = {type: 'setUsername', payload: string }
	        | {type: 'setPassword', payload: string }
			| {type: 'setIsButtonDisabled', payload: boolean}
			| {type: 'loginSuccess', payload: string}
			| {type: 'loginFailed', payload: string}
			| {type: 'setIsError', payload: boolean};


const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'setUsername': 
		  return {
			...state,
			username: action.payload
		  };
		case 'setPassword': 
		  return {
			...state,
			password: action.payload
		  };
		case 'setIsButtonDisabled': 
		  return {
			...state,
			isButtonDisabled: action.payload
		  };
		case 'loginSuccess': 
		  return {
			...state,
			helperText: action.payload,
			isError: false
		  };
		case 'loginFailed': 
		  return {
			...state,
			helperText: action.payload,
			isError: true
		  };
		case 'setIsError': 
		  return {
			...state,
			isError: action.payload
		  };
	  }

};
			


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			width: 400,
			margin: `${theme.spacing(0)} auto`
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1
		},
		header: {
			textAlign: 'center',
			background: '#212121',
			color: '#fff'
		},
		card: {
			marginTop: theme.spacing(10)
		}
	})
);


const Login = (props: {title: string}) => {

	const classes = useStyles();

	const [state,dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (state.username.trim() && state.password.trim()) {
		 dispatch({
		   type: 'setIsButtonDisabled',
		   payload: false
		 });
		} else {
		  dispatch({
			type: 'setIsButtonDisabled',
			payload: true
		  });
		}
	}, [state.username, state.password]);

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		dispatch({
			type: "setUsername",
			payload: event.target.value
		});
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		dispatch({
			type: 'setPassword',
			payload: event.target.value
		});
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if(event.keyCode === 8 || event.which === 8) {
			state.isButtonDisabled || handleButtonClick();
		}
	}

	const handleButtonClick = () => {
		const data:string = JSON.stringify({username: state.username, password: state.password});
		axios.post(API_ENDPOINT + '/users',data,
		{headers: {'Content-type': 'application/json'}})
			.then(function(response){
				console.log(response.data);
			})
		console.log(data);
	}




	return (
		<form className={classes.container} noValidate autoComplete='off'>
			<Card className={classes.card}>
				<CardHeader className={classes.header} title={props.title}></CardHeader>
				<CardContent>
					<div>
						<TextField
						  fullWidth
						  id="username"
						  type="username"
						  label="Username"
						  placeholder="Username"
						  margin="normal"
						  onChange={handleUsernameChange}
						  onKeyPress={handleKeyPress}
						/>
						<TextField
						  fullWidth
						  id="password"
						  type="password"
						  label="password"
						  placeholder="Password"
						  margin="normal"
						  onChange={handlePasswordChange}
						  onKeyPress={handleKeyPress}
						/>
					</div>
				</CardContent>
				<CardActions>
					<Button
					  variant="contained"
					  size="large"
					  color="secondary"
					  className={classes.loginBtn}
					  onClick={handleButtonClick}
					  disabled={state.isButtonDisabled}
					>
						{props.title}
					</Button>
				</CardActions>
			</Card>
		</form>
	);
}

export default Login;
