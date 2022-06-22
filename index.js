// projeto inciado em 20/06/22 as 18:21
const express = require('express');
const bodyParser = require('body-parser');

// MIDDLEWARES
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const generateToken = require('./middlewares/generateToken');
const getTalkers = require('./middlewares/getTalkers');
const writeTalkers = require('./middlewares/writeTalkers');
const showTalkers = require('./middlewares/showTalkers');
const findTalker = require('./middlewares/findTalker');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatched = require('./middlewares/validateWatched');
const validateRate = require('./middlewares/validateRate');

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// rota que busca todos os talkers
app.get('/talker', showTalkers);

// rota que busca um talker específico por id
app.get('/talker/:id', findTalker);

// rota que retorna um token e faz as validações de login
app.post('/login', validateEmail, validatePassword, generateToken);

// POST TALKER
app.post('/talker', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatched,
  validateRate, 
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const id = Number(talkers[talkers.length - 1].id) + 1;
  const talker = { name, age, id, talk };
  await writeTalkers(talker);
  return res.status(201).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
