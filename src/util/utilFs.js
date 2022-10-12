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

module.exports = read;