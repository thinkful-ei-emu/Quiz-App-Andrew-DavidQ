import API from './api';
import Question from './question';
class Quiz {
  constructor() {    
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.currentQuestion = null;
    this.active = false;
    this.getToken();
    this.getQuestions();
    // this.getToken().then(()=>{
    //   this.getQuestions().then(() =>this.active=true);
    // });
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

  nextQuestion() {
    if(this.unasked.length) {
      //temp is temparaly representing DOM
      this.currentQuestion = this.unasked.shift();
      
      //ask the question
      this.asked.push(this.currentQuestion);
      console.log(this.currentQuestion.question);
    }
    else {
      console.log(`Thanks for playing! Your score was ${this.score}.Would u like to play aagain? Y/N`);
      this.scoreHistory.push(this.score);
      this.active = false;
      //game over
    }
  }

  handleQuestion(ans) {
    if(this.currentQuestion.checkAnswer(ans)) {
      this.score++;
      console.log('Correct!');
    }else{
      console.log('Sorry that\'s wrong');
    }
    this.nextQuestion();

  }
  endOfQuiz() {
    console.log('Would you like to play again?');

  }

}

export default Quiz;