import API from './api';
import Question from './question';
class Quiz {
  constructor() {    
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.getToken().then(()=>{
      this.getQuestions().then(() => this.nextQuestion());
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
      let temp = this.unasked.shift();
      //ask the question
      this.asked.push(temp);
      console.log(temp);
    }else{
      console.log('no quesion left');
      //game over
    }
  }

}

export default Quiz;