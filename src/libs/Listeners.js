
const Listeners = function () {
  this.listenerList = []
}

Listeners.prototype.add = function (listener) {
  if (this.listenerList.indexOf(listener) > -1) {
    // listener 只会被添加一次
    return
  }
  this.listenerList.push(listener)
}

Listeners.prototype.delete = function (listener) {
  const index = this.listenerList.indexOf(listener)
  if (index > -1) {
    this.listenerList.splice(index, 1)
  }
}

Listeners.prototype.clear = function () {
  this.listenerList = []
}

Listeners.prototype.notify = function (value) {
  this.listenerList.forEach(listener => {
    listener(value)
  })
}

export default Listeners
