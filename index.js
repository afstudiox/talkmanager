// projeto inciado em 20/06/22 as 18:21
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
// const { restart } = require('nodemon');
// const { response } = require('express');

const app = express();

app.use(bodyParser.json());

app.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const emptyArray = [];

// função que faz a validação do email
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  // valida se o email foi passado 
  if (!email || email.length === 0) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // valida se foi passado um email válido
  const regex = /\S+@\S+\.\S+/;
  const testEmail = regex.test(email);
  if (!testEmail) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

// função que faz a validação do password
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  // valida se o password foi passado
  if (!password || password.length === 0) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  // valida se o password tem pelo menos 6 caracteres
  if (password.length <= 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

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

// rota que retorna um token e faz as validações de login
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  // const { email, password } = req.body;
  const tokenString = generateToken(); // gera token aleatorio
  const token = { token: tokenString }; // adiciona o o valor do token na chave token 
  return res.status(200).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
