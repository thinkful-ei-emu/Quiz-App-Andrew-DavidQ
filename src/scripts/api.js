const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const BASEURL = 'https://opentdb.com/api.php?amount=5';
class API {

  static async getQuestions(session) {
    let questions = await doFetch(`${BASEURL}&token=${session}`);

    if(!questions) return Promise.reject('Failed to get questions');

    return Promise.resolve(questions);
  }

  static async getSessionToken() {
    let session = await doFetch(sessionTokenUrl);

    if (!session) return Promise.reject('Failed to get token.');

    return Promise.resolve(session.token);
  }

}
async function doFetch(...args){
  let res = await fetch(...args);

  if(!res.ok) return Promise.reject(new Error(res.statusText));

  return Promise.resolve(res.json());
}

export default API;