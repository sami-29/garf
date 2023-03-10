import Parser from './parser';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { evaluate } from './interpreter';
import Environment from './interpreter/environment';

const rl = readline.createInterface({ input, output });

async function garf() {
  // eslint-disable-next-line prefer-const
  let running = true;
  console.log('Garf v0.1');
  const parser = new Parser();
  const env = new Environment();

  while (running) {
    const input = await rl.question('> ');
    if (!input || input.includes('exit')) {
      running = false;
      rl.close();
      process.exit(1);
    }

    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}

garf().catch(console.error);
