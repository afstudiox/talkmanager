const fs = require('fs/promises');
const getTalkers = require('./getTalkers');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers(); 
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  console.log('Este é o talkerIndex: ', talkerIndex);
  talkers.splice(talkerIndex, 1);
  const talkersToStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersToStr);
  return res.status(204).end();
};

module.exports = deleteTalker;