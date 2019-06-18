import API from './api';
import Question from './question';
import Model from '../lib/Model';

class Quiz extends Model {
  
  constructor() {
    super();
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [0];
    this.currentQuestion = null;
    this.active = false;
    this.getToken()
      .then(() => { this.getQuestions();
      });
  }

  async getToken() {
    const sessionToken = await API.getSessionToken();

    if (!sessionToken) return Promise.reject('Failed to get session token.');

    this.token = sessionToken;

    return Promise.resolve(sessionToken);    
  }

  async getQuestions() {
    const questions = await API.getQuestions(this.token);
    
    if(!questions) return Promise.reject('Failed to get questions.');
    
    this.unasked = questions.results.map(q=>{
      return new Question(q);
    });

    return Promise.resolve(questions);
  }

  startNewGame() {
    this.active = true;
    this.nextQuestion();
  }

  nextQuestion() {
    if(this.unasked.length) {
      //temp is temparaly representing DOM
      this.currentQuestion = this.unasked.shift();
      
      //ask the question
      this.asked.push(this.currentQuestion);
      // console.log(this.currentQuestion.question);
      // console.log(this.currentQuestion);
    }else{
      this.active =false;
    }
  }

  endOfQuiz() {
    this.scoreHistory.push(this.score);
    this.asked = [];
    this.currentQuestion = null;
    console.log('Would you like to play again?');

  }

  getHighScore() {
    return Math.max(...this.scoreHistory);
  }

  /**
   * 
   * @param {string} ans 
   */
  handleQuestion(ans) { 
    if(this.currentQuestion.checkAnswer(ans)) {
      this.score++;
      return true;
    }else{
      console.log('Sorry that\'s wrong');
      return false;
    }
  }

  handleReset() {
    console.log(this);
    this.score = 0;
    this.getQuestions();
  }
}

export default Quiz;