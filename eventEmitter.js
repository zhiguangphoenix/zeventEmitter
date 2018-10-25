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
    // 使用一个新函数包装，先移除该listener，再运行该listener，保证它只运行一次
    let fn = () => {
      this.off(eventName, listener);
      listener.apply(this, arguments);
    }
    fn.rawListener = listener;

    this.on(eventName, fn);
    return this;
  }

  emit(eventName, ...args) {
    let listeners;
    if (!this._events || !(listeners = this._events[eventName])) {
      return this;
    }

    listeners = listeners.slice(0);
    listeners.forEach(fn => {
      fn.apply(this, args);
    });

    return this;
  }

  off(eventName, listener) {
    let listeners;
    if (!this._events || !(listeners = this._events[eventName])) {
      return this;
    }

    listeners.forEach((fn, index) => {
      if (fn === listener || fn.rawListener === listener) {
        listeners.splice(index, 1);
      }
    })

    if (listeners.length === 0) {
      delete this._events[eventName];
    }

    return this;
  }

  offAll(eventName) {
    if (!this._events) {
      return this;
    } else if (typeof this._events[eventName] === 'undefined') {
      let listenersArr = Object.values(this._events);
      listenersArr.forEach(arr => {
        arr.length = 0;
      })
    } else {
      this._events[eventName].length = 0;
    }
  }

  listeners(eventName) {
    if (!eventName) return [];
    return this._events[eventName];
  }
}

module.exports = eventEmitter;