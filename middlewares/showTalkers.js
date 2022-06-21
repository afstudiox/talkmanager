const getTalkers = require('./getTalkers');

const showTalkers = async (req, res) => {
  const emptyArray = [];
  const loadTalkers = await getTalkers();
  return loadTalkers.length !== 0 
  ? res.status(200).json(loadTalkers)  
  : res.status(200).json(emptyArray);
};

module.exports = showTalkers;