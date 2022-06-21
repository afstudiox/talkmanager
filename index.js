// projeto inciado em 20/06/22 as 18:21
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
// const { restart } = require('nodemon');
// const { response } = require('express');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const emptyArray = [];

// função que faz a leitura do arquivo de talkers
const getTalkers = async () => {
  const talkersRead = await fs.readFile('./talker.json'); // le o arquivo de forma assincrona
  const talkersJson = JSON.parse(talkersRead); // converte arquivo em JSON
  return talkersJson;
};

// função que gera um token
const generateToken = () => crypto.randomBytes(8).toString('hex');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// rota que busca todos os talkers
app.get('/talker', async (_req, res) => {
  const loadTalkers = await getTalkers(); // executa a função getTalkers de forma assincrona
  return loadTalkers.length !== 0 
  ? res.status(200).json(loadTalkers) // Caso tenha conteudo no arquivo retorna o arquivo convertido 
  : res.status(200).json(emptyArray); // Caso não tenha nada no arquivo retorna array vazio
});

// rota que busca um talker específico por id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const loadTalkers = await getTalkers(); // executa a função getTalkers de forma assincrona
  const talkerFind = loadTalkers.find((talker) => talker.id === Number(id)); // busca o talker pelo ID
  return !talkerFind 
  ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' }) // caso não encontre o talker mostra mensagem
  : res.status(200).json(talkerFind); // caso encontro o talker, mostre as infos dele
});

// rota que retorna um token e envia email e password no body
app.post('/login', async (_req, res) => {
  // const { email, password } = req.body;
  const tokenString = generateToken();
  const token = { token: tokenString };
  return res.status(200).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
