class Question {

  constructor(question) {
    Object.assign(this, question);
    
    this.answered = false;
    this.userAnswer = '';
    this.correct = false;
    this.allAnswers = [...this.incorrect_answers];

    this.allAnswers.push(this.correct_answer);
    this.allAnswers.sort((a, b) => a < b);
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