const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const httpStatus = require('http-status-codes');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (request, response) => {
  const file = './board.json';
  jsonfile.readFile(file)
    .then(board => response.status(httpStatus.OK).json(board))
    .catch(error => console.error(error));
});

app.post('/', (request,response) => {
  const file = './move.json';
  console.log(request);
  jsonfile.writeFile(file, request.body)
    .then(res => {
      console.log('Write complete.')
      response.status(httpStatus.NO_CONTENT).end();
    })
    .catch(error => console.error(error));
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
