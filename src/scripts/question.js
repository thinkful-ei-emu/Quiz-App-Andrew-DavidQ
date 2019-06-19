class Question {

  constructor(question) {

    // Object.entries(question).forEach((key,value) => {
    //   key = decodeURIComponent(key);
    //   value = decodeURIComponent(value);
    // });

    Object.assign(this, question);
    this.answered = false;
    this.userAnswer = '';
    this.correct = false;
    
    this.question = decodeURIComponent(this.question);
    this.correct_answer = decodeURIComponent(this.correct_answer);
    this.incorrect_answers.forEach((answer,index,self) => {
      self[index] = decodeURIComponent(answer);
    });

    this.allAnswers = [...this.incorrect_answers];
    this.allAnswers.push(this.correct_answer);
    this.allAnswers.sort();
  }

  /**
   * 
   * @param {string} answer 
   * @returns {boolean}
   */
  checkAnswer(answer) {
    this.answered = true;
    this.userAnswer = answer;
    return this.correct = (answer === this.correct_answer);
  }
}

export default Question;