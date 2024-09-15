import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

console.log('\n✰ Iniciando Ruby-Hoshino-MD ✰');
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

// Cambiado a verde cromático
say('Ruby-Hoshino\nMD', {
  font: 'block',
  align: 'center',
  colors: ['pink', 'white'],  // Verde cromático y blanco para un efecto de resaltado
});

// Cambiado a un degradado entre rojo y azul
say('Multi Device', {
  font: 'chrome',
  align: 'center',
  colors: ['red', 'blue'],  // Degradado entre rojo y azul
});

// Cambiado a un color amarillo y cian
say('Developed By • Dioneibi', {
  font: 'console',
  align: 'center',
  colors: ['yellow', 'cyan'],  // Amarillo y cian para un contraste vibrante
});

var isRunning = false;
function start(file) {
  if (isRunning) return;
  isRunning = true;
  let args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['green', 'magenta'],  // Verde y magenta para un contraste fuerte
  });
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });
  let p = fork();
  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('🚩 Error:\n', code);
    process.exit();
    if (code === 0) return;
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim());
    });
}
process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn('🚩 Se excedió el límite de Listeners en:');
    console.warn(warning.stack);
  }
});
start('Ruby.js');
       
