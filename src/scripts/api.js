const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const BASEURL = 'https://opentdb.com/api.php?amount=5';

class API {
  /**
   * 
   * @param {string} session 
   * @returns {Promise}
   */
  static async getQuestions(session){
    let questions = await doFetch(`${BASEURL}&token=${session}`);

    if (!questions) return Promise.reject('Failed to get questions.');

    return Promise.resolve(questions);
  }

  /**
   * @returns {string}
   */
  static async getSessionToken() {
    const obj = await doFetch(sessionTokenUrl);

    if (!obj) return Promise.reject('Failed to get session token.');

    return Promise.resolve(obj.token);
  }
}

/**
 * 
 * @param  {...any} args
 * @returns {object}
 */
async function doFetch(...args){
  let res = await fetch(...args);
  
  if (!res.ok) return Promise.reject(new Error(res.statusText));

  return res.json();
}

export default API;