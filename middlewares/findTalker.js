const getTalkers = require('./getTalkers');

const findTalker = async (req, res) => {
  const { id } = req.params;
  const loadTalkers = await getTalkers(); 
  const talkerFind = loadTalkers.find((talker) => talker.id === Number(id)); 
  return !talkerFind 
  ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
  : res.status(200).json(talkerFind); 
};

module.exports = findTalker;