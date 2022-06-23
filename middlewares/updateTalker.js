const fs = require('fs/promises');
const getTalkers = require('./getTalkers');

const updateTalker = async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkers(); 
  const talkerFind = talkers.find((talker) => talker.id === Number(id)); 
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  talkers[id - 1] = { ...talkers[id - 1], name, age, id: Number(id), talk };
  const talkersToStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersToStr);
  res.status(200).json(talkers[id - 1]);
  next();
};

module.exports = updateTalker;
