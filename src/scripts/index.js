import $ from 'jquery';
import Quiz from './quiz';
import API from './api';

/* eslint-env jquery */

async function main() {
  let quiz = new Quiz();

  await quiz.getToken();
  await quiz.getQuestions();

  // console.log(questions);

  let x = 0;
  quiz.unasked.forEach((q) => {
    console.log(++x, q);
    console.log(q.allAnswers);
  });
}

$(main);