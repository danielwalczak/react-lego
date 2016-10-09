import debug from 'debug';

const log = debug('lego:server-logger')

export default function logger(){
  return function *logger(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    log(`${this.method} ${this.originalUrl} ${this.status} ${ms}ms`)
  }
}
