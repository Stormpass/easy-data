
let Listeners = function () {
  this.listenerList = []
}

let ListenersExtends = {
  add (listener) {
    if (this.listenerList.indexOf(listener) > -1) {
      // listener 只会被添加一次
      return
    } 
    this.listenerList.push(listener)
  },
  delete (listener) {
    const index = this.listenerList.indexOf(listener)
    if (index > -1) {
      this.listenerList.splice(index, 1)
    }
  },
  clear () {
    this.listenerList = []
  },
  notify (value) {
    this.listenerList.forEach(listener => {
      listener(value)
    })
  }
}

Listeners.prototype = Object.assign(Listeners.prototype, ListenersExtends)

export default Listeners