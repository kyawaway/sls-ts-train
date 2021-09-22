import { Button } from '@material-ui/core';
import axios from 'axios';


const API_ENDPOINT:string = "https://57eardlz1m.execute-api.ap-northeast-1.amazonaws.com/dev";

const handleButtonClick = () => {
	axios.get(API_ENDPOINT + '/users')
		.then(function(response){
			console.log(response.data);
		})
}



const GetButton = () => {
		return (
			<div>
				<Button
				  variant="contained"
				  color="primary"
				  onClick={handleButtonClick}
				>
					get user
				</Button>
			</div>
		);

}

export default GetButton;