const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const BASEURL = 'https://opentdb.com/api.php?amount=5';
class API {

  static getQuestions(session){
    return doFetch(`${BASEURL}&token=${session}` );
  }

  static getSessionToken() {
    return doFetch(sessionTokenUrl).then(obj=>obj.token);
  }

}
var doFetch = function(...args){
  return fetch(...args).then(resp =>{
    if(!resp.ok){
      return Promise.reject(new Error(resp.statusText));
    }else{
      return resp.json();
    }
  });

};  

export default API;