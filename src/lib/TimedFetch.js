const FETCH_TIMEOUT = 3000;

export function TimeoutError(message) {
  this.name = "TimeoutError";
  this.message = message;
  this.stack = (new Error()).stack;
}

TimeoutError.prototype = new Error();

const status = (result) => {
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  return result;
};

export default function (url, options) {
  let leTimeout = new Promise((resolve, reject) => {
    setTimeout(() => reject(new TimeoutError("Oooops timeout happened")), FETCH_TIMEOUT);
  });

  let leFetch = new Promise((resolve, reject) => {
    fetch(url, options)
      .then(status)
      .then(result => result.json())
      .then(
        json => resolve(json),
        error => reject(error)
      );
  });

  return Promise.race([leTimeout, leFetch]);
}