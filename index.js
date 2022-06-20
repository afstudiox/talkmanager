// projeto inciado em 20/06/22 as 18:21
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const fs = require('fs/promises');
// const { restart } = require('nodemon');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const emptyArray = [];
  const talkersRead = await fs.readFile('./talker.json'); // le o arquivo de forma assincrona
  const talkersJson = JSON.parse(talkersRead); // converte arquivo em JSON
  return talkersJson.length !== 0 
  ? res.status(200).json(talkersJson) // Caso tenha conteudo no arquivo retorna o arquivo convertido 
  : res.status(200).json(emptyArray); // Caso não tenha nada no arquivo retorna array vazio
});

app.listen(PORT, () => {
  console.log('Online');
});
