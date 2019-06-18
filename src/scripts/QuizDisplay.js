import Renderer from '../lib/Renderer';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit #questionForm': 'handleSubmit'
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

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    if(this.model.active) {
      html = this._generateQuestion();
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
    this.model.handleQuestion(answer);
    this.renderAll();
  }
}

export default QuizDisplay;
