

const communication = {};

communication.makeMove = (move) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: "no-cors"
  };
  if (move && typeof move === 'object' && Object.keys(move).length > 0) {
    options.body = JSON.stringify(move);
  }
  else if (move && typeof move !== 'object') {
    options.body = move;
  }

  return fetch('http://localhost:3001/', options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return;
    })

};

communication.readBoard =  () => {

};


export default communication;
