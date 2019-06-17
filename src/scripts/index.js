import API from './api';
import Question from './question';
import $ from 'jquery';

/* eslint-env jquery */
function main() {
  const api = new API();
  api.getSessionToken()
    .then(resolve => {
      console.log(resolve.token);
    });

  let question = new Question({text: 'test question'});
  console.log(question);
}

$(main);