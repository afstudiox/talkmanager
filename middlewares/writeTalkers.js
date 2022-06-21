const fs = require('fs/promises');
const getTalkers = require('./getTalkers');

const writeTalkers = async (data) => {
  const talkers = await getTalkers(); 
  talkers.push(data);
  const talkersToStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersToStr);
};

module.exports = writeTalkers;