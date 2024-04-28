const fs = require('fs');
const util = require('util');

const ReadFile = util.promisify(fs.readFile);

async function main() {
    try {
        let part1 = await ReadFile(__dirname + '/resources/sonnet8-1.txt');
        let part2 = await ReadFile(__dirname + '/resources/sonnet8-2.txt');
        let part3 = await ReadFile(__dirname + '/resources/sonnet8-3.txt');
        let sonnet8 = part1 + part2 + part3;
        console.log(sonnet8);
    } catch (error) {
        console.log(error);
    }
}

main();