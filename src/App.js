import React from 'react'
import './style.css'

import Blob1 from './images/blob1.png'
import Blob2 from './images/blob2.png'

import BootScreen from './components/BootScreen'
import QuestionScreen from './components/QuestionScreen'

export default function App() {
	const [startQuiz, setStartQuiz] = React.useState(false);
	const [dataOptions, setDataOptions] = React.useState({
				category: "any"
		});

	function handleDataOptionChange(event) {
		event.preventDefault();
		setDataOptions(prevState => {
				return {
							...prevState,
							[event.target.name]: event.target.value
						}
		});
	}

	const props_dataOptions = {handleDataOptionChange:handleDataOptionChange, data: dataOptions};

	function questionScreen() {
		setStartQuiz(true);	
	}
	
	return (
		<main>
			{!startQuiz && <BootScreen 
				dataOptions={props_dataOptions}	
				startQuiz={questionScreen} />}
			{startQuiz && <QuestionScreen dataOptions={dataOptions} />}
			<img src={Blob1} className="blob_1" />
			<img src={Blob2} className="blob_2" />
			<div className="sign_div center">
				<p className="sign">BUILD BY: <a href="https://abhaywani114.github.io/" 
											target="_blank" className="sign_a">Abrar Ajaz Wani</a> | POWERED BY: <a href="https://opentdb.com/" className="sign_a">Open Trivia DB</a></p>
			</div>
		</main>
	);
}
