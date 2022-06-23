const getTalkers = require('./getTalkers');

const searchTalker = async (req, res) => {
  const { q } = req.query;
  console.log('ATENÇAO =>', q);
  const talkers = await getTalkers();
  const filterTalkers = talkers.filter((talker) => talker.name.includes(q));
  return res.status(200).json(filterTalkers);
};

module.exports = searchTalker;