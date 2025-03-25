const { program } = require('commander');
const fs = require('fs');

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Cannot find input file');
    process.exit(1);
  }
}

function filterBanksData(data) {
  let filtered = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === 'BS3_BanksLiab') {
      filtered.push(data[i]);
    }
  }
  return filtered;
}

function formatData(filtered) {
  let output = '';
  for (let i = 0; i < filtered.length; i++) {
    output += filtered[i].txten + ':' + filtered[i].value;
    if (i < filtered.length - 1) {
      output += '\n';
    }
  }
  return output;
}

program
  .option('-i, --input <шлях>', 'шлях до JSON файлу (обов’язковий)')
  .option('-o, --output <шлях>', 'шлях для збереження')
  .option('-d, --display', 'показати в консолі')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

const data = readJsonFile(options.input);

const filtered = filterBanksData(data);

const result = formatData(filtered);

if (options.output) {
  fs.writeFileSync(options.output, result, 'utf8');
}

if (options.display) {
  console.log(result);
}
