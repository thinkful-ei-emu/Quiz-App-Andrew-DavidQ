import Renderer from '../lib/Renderer';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
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
    const question = this.model.currentQuestion.question;

    return `
      <h2>${question}</h2>`;
  }

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }
    // if(this.model.active){
    //   html = this._generateQuestion();
    // }
    
    return html;
  }

  handleStart() {
    this.model.startNewGame();
    this.renderAll();//this function should be called every time quiz has a state change
  }
}

export default QuizDisplay;
