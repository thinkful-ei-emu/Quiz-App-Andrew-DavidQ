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
    this.getToken().then(()=>{
      this.getQuestions().then(() =>this.active=true);
    });
  }
  getToken(){
    return API.getSessionToken().then(res=>this.token = res);
  }
  getQuestions(){
    return API.getQuestions(this.token).then(obj=> this.unasked = obj.results.map(q=>{
      return new Question(q);
    }));
  }
  nextQuestion(){
    if(this.unasked.length){
      //temp is temparaly representing DOM
      this.currentQuestion = this.unasked.shift();
      //ask the question
      this.asked.push(this.currentQuestion);
      console.log(this.currentQuestion.question);
    }else{
      console.log( ` Thanks for playing! Your score was ${this.score}.Would u like to play aagain? Y/N`);
      this.scoreHistory.push(this.score);
      this.active = false;
      //game over
    }
  }

  handleQuestion(ans){
    if(this.currentQuestion.checkAnswer(ans)){
      this.score++;
      console.log('Correct!');
    }else{
      console.log('Sorry thats wrong');
    }
    this.nextQuestion();

  }
  endOfQuiz(){
    console.log(' would u like to play aagain?');

  }

}

export default Quiz;