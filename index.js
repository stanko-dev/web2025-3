const { program } = require('commander');
const fs = require('fs');


program
  .option('-i, --input <path>', 'Path to input JSON file (required)')
  .option('-o, --output <path>', 'Path to output file (optional)')
  .option('-d, --display', 'Display result in console (optional)')
  .parse(process.argv);

const options = program.opts();


if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}


let data;
try {
  const fileContent = fs.readFileSync(options.input, 'utf8');
  data = JSON.parse(fileContent);
} catch (error) {
  console.error('Cannot find input file');
  process.exit(1);
}


const filteredData = data.filter(item => item.parent === 'BS3_BanksLiab');


const result = filteredData
  .map(item => `${item.txten}:${item.value}`)
  .join('\n');


if (options.output) {
  fs.writeFileSync(options.output, result, 'utf8');
}

if (options.display) {
  console.log(result);
}
