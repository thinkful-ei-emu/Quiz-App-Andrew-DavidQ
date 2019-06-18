import $ from 'jquery';
import Quiz from './quiz';
import API from './api';

/* eslint-env jquery */

function main() {
  let quiz = new Quiz();
  window.quiz = quiz; // exposes quiz to terminal for testing purpose 
}

$(main);