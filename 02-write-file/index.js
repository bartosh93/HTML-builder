const fs = require('fs');
const path = require('path');

const readline = require('readline');

const dir = '02-write-file';
const filePath = path.join(dir, 'text.txt');

const writeableStream = fs.createWriteStream(filePath);

console.log('Welcome to the input logger program!');
console.log(
  'Type your input and press Enter. Type "exit" to leave the program.',
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Thank you for using the input logger. Goodbye!');
    rl.close();
    writeableStream.end();
  } else {
    writeableStream.write(`${input}\n`);
  }
});

process.stdin.resume();
const closeResources = () => {
  console.log('Thank you for using the input logger. Goodbye!');
  rl.close();
  writeableStream.end();
  process.exit();
};

process.on('SIGINT', closeResources);
