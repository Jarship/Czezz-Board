

const communication = {};

communication.makeMove = (move) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: "cors"
  };
  if (move && typeof move === 'object' && Object.keys(move).length > 0) {
    options.body = JSON.stringify(move);
  }
  else if (move && typeof move !== 'object') {
    options.body = move;
  }
  return callApi(options);
};

communication.readBoard =  (prevBoard) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: "cors"
  };

  return callApi(options);

};

const callApi = (options) => {
  return fetch('http://localhost:3001/', options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        console.error(`Problems making the ${options.method} call.`);
        return;
      }
    })
    .catch(error => console.error(error));
};


export default communication;
