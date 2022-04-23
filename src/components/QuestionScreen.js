import React from 'react'
import {nanoid} from 'nanoid'
import Question from './Question'

export default function QuestionScreen(props) {

	const [questionData, setQuestionData] = React.useState([]);
	const [selectedOption, setSelectedOption] = React.useState([]);
	const [quizSubmit, setQuizSubmit] = React.useState(false);
	const [countCorrect, setCountCorrect] = React.useState(0);

	function loadQuizData() {
		fetch(`https://opentdb.com/api.php?amount=15${
					props.dataOptions.category != "any" ? '&category=' + props.dataOptions.category:''
			}`).
			then(res => res.json()).
			then(data => setQuestionData(data.results.map(q => {
					q.options = ([...q.incorrect_answers, q.correct_answer].
						sort( () => Math.random() - 0.5));
					q.id = nanoid();
					return q;
			})));
		}

	React.useEffect( () => {
		loadQuizData();
	}, []);

	React.useEffect( () => {
		setCountCorrect( prevCount => {
			let count = 0;
			selectedOption.forEach( o => {
				const correct_option = questionData.find( e =>( e.id === o.question_id && 
					e.correct_answer === o.option));

				if (correct_option)
					count++;
			});

			return count;
		});
	}, [quizSubmit]);

	function selectOption(question_id, option) {
		setSelectedOption(prevState => {
			const newState = prevState.filter( e => e.question_id != question_id);
			newState.push({question_id, option});
			return newState;
		});
	}

	function newQuiz() {
		setQuestionData([]);
		setSelectedOption([]);
		setCountCorrect(0);
		setQuizSubmit(false);
		loadQuizData();
	}

	const questions = questionData.map( q => (
			<Question 
				key={q.id} 
				data={q} 
				selectOption={selectOption}
				selectedOption={selectedOption} 
				quizSubmit={quizSubmit}
				/>
		));
		
	return (
		<div className="question-screen">
			<div className="question-area">
				{questions}
				{questions.length < 1 && <h3>Loading new questions...</h3>}
			</div>
			<div className="action-btn-container">
				{ questionData.length > 0 && selectedOption.length === questionData.length && !quizSubmit && (
					<button onClick={() => setQuizSubmit(true)} className="check-answer">Check Answer</button>)}

				{ questionData.length > 0 && selectedOption.length !== questionData.length && !quizSubmit && (
					<button onClick={() => loadQuizData()} className="check-answer">New Quiz</button>)}

				{ quizSubmit && (
					<>
						<h6>You scored {countCorrect}/{questionData.length} correct answers</h6>
						<button className="check-answer new-quiz" onClick={newQuiz}>New Quiz</button>
					</>
				)}
			</div>
		</div>
	);
}
