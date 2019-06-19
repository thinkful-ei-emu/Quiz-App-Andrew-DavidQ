import Renderer from '../lib/Renderer';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit #questionForm': 'handleSubmit',
      'click #playAgainButton': 'handlePlayAgain',
      'click #nextBtn':'handleNext',
    };
  }

  _generateIntro() {
    return `
      <div>
        <h1>
          Welcome to the Trivia Quiz
        </h1>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz btn">Start Quiz</button>
      </div>
    `;
  }

  _generateQuestion() {
    let currentQuestion = this.model.currentQuestion;
    const answered = currentQuestion.answered;
    const question = currentQuestion.question;
    let answers = '';
    currentQuestion.allAnswers.forEach(answer => {
      answers += `
        <li>
          <input id="${answer}" name="answer" type="radio" value="${answer}" required ${answered ? 'disabled': ''}/>
          <label class="btn btn-primary choices" for="${answer}">${answer}</label>
        </li>
        `;
    });

    return `
      <form id="questionForm">
        <h1 class="question">${question}</h1>
        <ul class="btn-group-vertical">
          ${answers}
        </ul>
        <button type="submit" class="btn" value="Submit" ${answered ? 'disabled': ''}>Submit</button>
        <button id="nextBtn" class="btn" type="button" ${answered ? '': 'disabled'}>Next >></button>
      </form>
      `;
  }
  _generateEndScreen() {
    return `
      <h1>You finished the quiz!</h1>
      <p>Score: ${this.model.score}</p>
      <p>High Score: ${this.model.getHighScore()}</p>
      <button id="playAgainButton" class="btn" type="button">Play Again?</button>
    `;
  }

  _generateResults(){
    if(!this.model.currentQuestion.answered){
      return '';
    }
    else if (this.model.currentQuestion.correct){
      return `
        <section class="green">
          <p>You got it right!</p>
          <p>Your answer was: ${this.model.currentQuestion.userAnswer}</p>
        </section>
      `;
    }
    else {
      return `
        <section class="red">
          <p>Sorry that's wrong.</p>
          <p>Your answer was: ${this.model.currentQuestion.userAnswer}</p>
          <p>The correct answer was: ${this.model.currentQuestion.correct_answer}</p>
        </section>
      `;
    }
  }

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    else if (this.model.active) {
      html = this._generateQuestion() + this._generateResults();
    }
    else {
      this.model.endOfQuiz();
      html = this._generateEndScreen();
    }
    
    return html;
  }

  handleStart() {
    this.model.startNewGame();
    this.renderAll();//this function should be called every time quiz has a state change
  }

  /**
   * 
   * @param {string} ans 
   */
  handleSubmit(e) {
    e.preventDefault();
    let answer = new FormData(e.target).get('answer');
    this.model.handleQuestion(answer);
    this.renderAll();
  }

  handleNext() {
    this.model.nextQuestion();
    this.renderAll();
  }

  handlePlayAgain() {
    this.model.handleReset();
    this.renderAll();
  }
}

export default QuizDisplay;