const { program } = require('commander');


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


const fs = require('fs');
try {
  fs.readFileSync(options.input, 'utf8');
} catch (error) {
  console.error('Cannot find input file');
  process.exit(1);
}
