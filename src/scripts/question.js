class Question {
  constructor(question) {
    Object.assign(this, question);
    this.answered = false;
    this.response = '';
  }

  checkAnswer(answer) {
    this.answered = true;
    this.response = answer;
    return answer === this.correct_answer;
  }
}

export default Question;