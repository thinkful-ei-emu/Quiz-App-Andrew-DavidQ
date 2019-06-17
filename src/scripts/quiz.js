class Quiz {
  constructor(token) {
    if (!token) throw new Error('No token received.');
    
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.token = token;
  }

}

export default Quiz;