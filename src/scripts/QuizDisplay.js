import Renderer from '../lib/Renderer';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit #questionForm': 'handleSubmit',
      'click #playAgainButton': 'handlePlayAgain'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  _generateQuestion() {
    let currentQuestion = this.model.currentQuestion;
    const question = currentQuestion.question;
    let answers = '';
    currentQuestion.allAnswers.forEach(answer => {
      console.log(answer);
      answers += `
        <li>
          <input id="${answer}" name="answer" type="radio" value="${answer}"/>
          <label for="${answer}">${answer}</label>
        </li>
        `;
    });

    return `
      <form id="questionForm">
        <h2>${question}</h2>
        <ul>
          ${answers}
        </ul>
        <button type="submit" value="Submit">Submit</button>
      </form>
      `;
  }

  _generateEndScreen() {
    return `
      <p>You finished the quiz!</p>
      <p>Score: ${this.model.score}</p>
      <p>High Score: ${this.model.getHighScore()}</p>
      <button id="playAgainButton" type="button">Play Again?</button>
    `;
  }

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    else if (this.model.active && this.model.unasked.length) {
      html = this._generateQuestion();
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
    console.log(answer);
    console.log(this.model.currentQuestion.correct_answer);
    this.model.handleQuestion(answer);
    this.renderAll();
  }

  handlePlayAgain(e) {
    this.model.handleReset();
    this.renderAll();
  }
}

export default QuizDisplay;
