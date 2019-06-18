import $ from 'jquery';
import Quiz from './quiz';
import API from './api';
import QuizStatus from '../QuizStatus';
import QuizDisplay from '../QuizDisplay';

/* eslint-env jquery */

function main() {
  let quiz = new Quiz();
  //let quizStatus = new QuizStatus(quiz,'.quizStatus');
  //let quizDisplay = new QuizDisplay(quiz,'.quizDisplay');
  window.quiz = quiz; // exposes quiz to terminal for testing purpose 
  window.quizDisplay = quizDisplay;
}

$(main);