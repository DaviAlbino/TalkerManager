const fs = require('fs').promises;
const path = require('path');

const read = async () => {
    try {
        const file = await fs.readFile(path.resolve(__dirname, '../talker.json'));
        return JSON.parse(file);
    } catch (error) {
        return null;
    }
};

const talkerPostUtil = async (talker) => {
    try {
        const talkerList = read();
        const newTalkerList = { id: talkerList.length + 1, ...talker };
        const updatedTalkersList = JSON.stringify([...talkerList, newTalkerList]);
        await fs.writeFile(path.resolve(__dirname, '../talker.json'), updatedTalkersList);
        return newTalkerList;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
};

module.exports = {
    read,
    talkerPostUtil,
};