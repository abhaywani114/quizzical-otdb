import React from "react"
import parse from 'html-react-parser';

export default function Question(props) {
	const options = props.data.options.map(q =>  {
		const isSelected = props.selectedOption.find( e => (
			e.question_id === props.data.id && e.option === q));

		const correct_option = props.quizSubmit && props.data.correct_answer == q//isSelected.option;
		const incorrect_option = props.quizSubmit && isSelected && props.data.correct_answer != isSelected.option;

		let bgcolor
		if (isSelected && !props.quizSubmit)
			 bgcolor = "#D6DBF5"
		else if (props.quizSubmit && correct_option)
			 bgcolor = "#94D7A2"
		else if (props.quizSubmit && incorrect_option)
			 bgcolor = "#F8BCBC"
				
		const style = {
				backgroundColor: bgcolor
		};

		return (
			<button
					key={q} 
					style={style}
					className={`option-button`}
					onClick={() => props.selectOption(props.data.id, q)}>{parse(q)}</button>
		)
	});
	const dStyle = {
			backgroundColor: "#000"
	};
	if (props.data.difficulty == "easy")
		dStyle.backgroundColor = "Green";
	else if (props.data.difficulty == "medium")
		dStyle.backgroundColor = "yellow"
	if (props.data.difficulty == "hard")
		dStyle.backgroundColor = "red"

	return (
		<div className="question-frame">
			<h3 className="question-text">{parse(props.data.question)}</h3>
			<div className="question-option">{options}</div>
			<div className="question-difficulty">
					<span style={dStyle} className="question-d-color"></span>
					<span className="question-d-text">{props.data.difficulty}</span>
			</div>
		</div>
	);
}
