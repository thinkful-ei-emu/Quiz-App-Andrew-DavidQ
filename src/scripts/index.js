import $ from 'jquery';
import Quiz from './quiz';
import API from './api';

/* eslint-env jquery */

async function main() {
  let quiz =  await new Quiz();  
  //console.log(quiz);
  /* quiz.getToken().then(()=>quiz.getQuestions()).then(()=>{
    quiz.nextQuestion();
    console.log(quiz);
  }); */
  quiz.nextQuestion();
}

$(main);