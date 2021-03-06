import Renderer from '../lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`
    if(!this.model.active){
      return `
        <p>Previous Score:${this.model.getHighScore()}</p>
    `;
    }else{
      return `<p class="col-md-4">current score: ${this.model.score}</p>
        <p class="col-md-4">${this.model.asked.length} of 5 </p>
      `;
    }
  }
}

export default QuizStatus;