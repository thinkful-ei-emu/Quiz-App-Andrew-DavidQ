const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const BASEURL = 'https://opentdb.com/api.php?amount=5&encode=url3986';

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
    const session = await doFetch(sessionTokenUrl);

    if (!session) return Promise.reject('Failed to get session token.');

    return Promise.resolve(session.token);
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