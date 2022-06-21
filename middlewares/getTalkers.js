const fs = require('fs/promises');

const getTalkers = async () => {
  const talkersRead = await fs.readFile('./talker.json'); 
  const talkersJson = JSON.parse(talkersRead); 
  return talkersJson;
};

module.exports = getTalkers;