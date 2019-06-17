class API {
  constructor() {
    this.BASEURL = 'https://opentdb.com/api.php?amount=10';
    this.sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
  }

  getSessionToken() {
    return fetch(this.sessionTokenUrl)
      .then(res => {
        if (!res.ok) return Promise.reject(new Error(res.statusText));
        else return res.json();
      }); 
  }

}

export default API;