import $ from 'jquery';
import Quiz from './quiz';
import QuizStatus from './QuizStatus';
import QuizDisplay from './QuizDisplay';
import '../styles/css/bootstrap.css';
import '../styles/main.css';


/* eslint-env jquery */

function main() {
  let quiz = new Quiz();
  let quizStatus = new QuizStatus(quiz,'.quizStatus');
  let quizDisplay = new QuizDisplay(quiz,'.quizDisplay');
  // window.quiz = quiz; // exposes quiz to terminal for testing purpose 
  // window.quizDisplay = quizDisplay;
}

$(main);