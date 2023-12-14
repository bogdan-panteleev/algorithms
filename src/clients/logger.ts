import fs from 'fs';
import util from 'util';
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });

export function logger(param: any) {
  log_file.write(util.format(param) + '\n');
  console.log(param);
}
