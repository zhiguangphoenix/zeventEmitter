const eventEmitter = require('./eventEmitter');

let emitter = new eventEmitter();
function hit1() {
  console.log('hit111');
}
function hit2() {
  console.log('hit222');
}

emitter.once('hit', hit1);
emitter.on('hit', hit2);

emitter.emit('hit');
emitter.emit('hit');

emitter.offAll();
emitter.emit('hit');