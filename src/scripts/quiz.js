import API from './api';
import Question from './question';

class Quiz {
  
  constructor() {
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.token = '';
    // this.setToken();
    // this.getQuestions();
  }

  startQuiz() {
    this.active = true;

    // do other stuff
  }

  async getToken() {
    let token = await API.getSessionToken();

    if (!token) return Promise.reject('Failed to get session token.');

    this.token = token;
    
    return Promise.resolve(token);
  }

  async getQuestions() {
    let questions = await API.getQuestions(this.token);
    // console.log(questions);
    this.unasked = questions.results.map(q => new Question(q));

    if (!questions) return Promise.reject('Failed to retrieve questions.');
    else return Promise.resolve(questions);
  }

  answerQuestion(question, input) {
    if (question.checkAnswer(input)) {
      this.score++;
    }
    this.nextQuestion();
  }

  nextQuestion() {
    if(this.unasked.length){
      //temp is temporarily representing DOM
      let temp = this.unasked.shift();
      
      //ask the question
      this.asked.push(temp);
      console.log(temp.allAnswers);
    }
    else{
      console.log('no questions left');
      this.active = false;
      //game over
    }
  }

}

export default Quiz;