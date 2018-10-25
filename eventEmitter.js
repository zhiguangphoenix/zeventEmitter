class eventEmitter {
  on(eventName, listener) {
    this._events = this._events || {};
    this._events[eventName] = this._events[eventName] || [];
    
    this._events[eventName].push(listener);
    return this;
  }

  addListener(eventName, listener) {
    return this.on.call(this, eventName, listener);
  }

  once(eventName, listener) {

  }

  off(eventName, listener) {

  }

  offAll(event) {

  }

  

  emit(eventName, ...args) {
    let listeners;
    if (!this._events || !(listeners = this._events[eventName])) {
      return this;
    }

    listeners = listeners.slice(0);
    listeners.forEach(listener => {
      listener.apply(this, args);
    });

    return this;
  }
}

let emitter = new eventEmitter();
emitter.on('hit', function () {
  console.log('hit111!!!');
});
emitter.on('hit', function () {
  console.log('hit222!!!');
});
emitter.emit('hit');