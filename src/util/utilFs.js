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
        const talkerList = await read();
        const newTalkerList = { id: talkerList.length + 1, ...talker };
        const updatedTalkersList = JSON.stringify([...talkerList, newTalkerList]);
        await fs.writeFile(path.resolve(__dirname, '../talker.json'), updatedTalkersList);
        return newTalkerList;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
};

const talkerPutUtil = async (id, talkerBody) => {
    try {
        const talkerList = await read();
        const talkerPut = { ...talkerBody, id };
        const newList = talkerList.filter((t) => t.id !== id);
        newList.push(talkerPut);
        console.log(newList);
        await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify([...newList]));
        return talkerPut;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
};

module.exports = {
    read,
    talkerPostUtil,
    talkerPutUtil,
};